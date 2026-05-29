---
title: <Activity> – React
source: https://es.react.dev/reference/react/Activity
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# <Activity> – React

### Experimental Feature

**This API is experimental and is not available in a stable version of React yet.**

You can try it by upgrading React packages to the most recent experimental version:

*   `react@experimental`
*   `react-dom@experimental`
*   `eslint-plugin-react-hooks@experimental`

Experimental versions of React may contain bugs. Don’t use them in production.

`<Activity>` lets you hide and show part of the UI.

```
<Activity mode={mode}><Page /></Activity>
```

*   [Reference](#reference)
    *   [`<Activity>`](#activity)
*   [Usage](#usage)
    *   [Pre-render part of the UI](#pre-render-part-of-the-ui)
    *   [Keeping state for part of the UI](#keeping-state-for-part-of-the-ui)
*   [Troubleshooting](#troubleshooting)
    *   [Effects don’t mount when an Activity is hidden](#effects-dont-mount-when-an-activity-is-hidden)
    *   [My hidden Activity is not rendered in SSR](#my-hidden-activity-is-not-rendered-in-ssr)

* * *

## Reference[](#reference "Link for Reference ")

### `<Activity>`[](#activity "Link for this heading")

Wrap a part of the UI in `<Activity>` to manage its visibility state:

```
import {unstable_Activity as Activity} from 'react';<Activity mode={isVisible ? 'visible' : 'hidden'}><Page /></Activity>
```

When “hidden”, the `children` of `<Activity />` are not visible on the page. If a new `<Activity>` mounts as “hidden” then it pre-renders the content at lower priority without blocking the visible content on the page, but it does not mount by creating Effects. When a “visible” Activity switches to “hidden” it conceptually unmounts by destroying all the Effects, but saves its state. This allows fast switching between “visible” and “hidden” states without recreating the state for a “hidden” Activity.

In the future, “hidden” Activities may automatically destroy state based on resources like memory.

#### Props[](#props "Link for Props ")

*   `children`: The actual UI you intend to render.
*   **optional** `mode`: Either “visible” or “hidden”. Defaults to “visible”. When “hidden”, updates to the children are deferred to lower priority. The component will not create Effects until the Activity is switched to “visible”. If a “visible” Activity switches to “hidden”, the Effects will be destroyed.

#### Caveats[](#caveats "Link for Caveats ")

*   While hidden, the `children` of `<Activity>` are hidden on the page.
*   `<Activity>` will unmount all Effects when switching from “visible” to “hidden” without destroying React or DOM state. This means Effects that are expected to run only once on mount will run again when switching from “hidden” to “visible”. Conceptually, “hidden” Activities are unmounted, but they are not destroyed either. We recommend using [`<StrictMode>`](https://es.react.dev/reference/react/StrictMode) to catch any unexpected side-effects from this behavior.
*   When used with `<ViewTransition>`, hidden activities that reveal in a transition will activate an “enter” animation. Visible Activities hidden in a transition will activate an “exit” animation.
*   Parts of the UI wrapped in `<Activity mode="hidden">` are not included in the SSR response.
*   Parts of the UI wrapped in `<Activity mode="visible">` will hydrate at a lower priority than other content.

* * *

## Usage[](#usage "Link for Usage ")

### Pre-render part of the UI[](#pre-render-part-of-the-ui "Link for Pre-render part of the UI ")

You can pre-render part of the UI using `<Activity mode="hidden">`:

```
<Activity mode={tab === "posts" ? "visible" : "hidden"}><PostsTab /></Activity>
```

When an Activity is rendered with `mode="hidden"`, the `children` are not visible on the page, but are rendered at lower priority than the visible content on the page.

When the `mode` later switches to “visible”, the pre-rendered children will mount and become visible. This can be used to prepare parts of the UI the user is likely to interact with next to reduce loading times.

In the following example from [`useTransition`](https://es.react.dev/reference/react/useTransition#preventing-unwanted-loading-indicators), the `PostsTab` component fetches some data using `use`. When you click the “Posts” tab, the `PostsTab` component suspends, causing the button loading state to appear:

import { useTransition } from 'react';

export default function TabButton({ action, children, isActive }) {
  const \[isPending, startTransition\] = useTransition();
  if (isActive) {
    return <b\>{children}</b\>
  }
  if (isPending) {
    return <b className\="pending"\>{children}</b\>;
  }
  return (
    <button onClick\={() \=> {
      startTransition(() \=> {
        action();
      });
    }}\>
      {children}
    </button\>
  );
}

In this example, the user needs to wait for the posts to load when clicking on the “Posts” tab.

We can reduce the delay for the “Posts” tab by pre-rendering the inactive Tabs with a hidden `<Activity>`:

import { useTransition } from 'react';

export default function TabButton({ action, children, isActive }) {
  const \[isPending, startTransition\] = useTransition();
  if (isActive) {
    return <b\>{children}</b\>
  }
  if (isPending) {
    return <b className\="pending"\>{children}</b\>;
  }
  return (
    <button onClick\={() \=> {
      startTransition(() \=> {
        action();
      });
    }}\>
      {children}
    </button\>
  );
}

* * *

### Keeping state for part of the UI[](#keeping-state-for-part-of-the-ui "Link for Keeping state for part of the UI ")

You can keep state for parts of the UI by switching `<Activity>` from “visible” to “hidden”:

```
<Activity mode={tab === "posts" ? "visible" : "hidden"}><PostsTab /></Activity>
```

When an Activity switches from `mode="visible"` to “hidden”, the `children` will become hidden on the page, and unmount by destroying all Effects, but will keep their React and DOM state.

When the `mode` later switches to “visible”, the saved state will be re-used when mounting the children by creating all the Effects. This can be used to keep state in parts of the UI the user is likely to interact with again to maintain DOM or React state.

In the following example from [`useTransition`](https://es.react.dev/reference/react/useTransition#preventing-unwanted-loading-indicators), the `ContactTab` includes a `<textarea>` with a draft message to send. If you enter some text and change to a different tab, then when you click the “Contact” tab again, the draft message is lost:

import { useTransition } from 'react';

export default function TabButton({ action, children, isActive }) {
  const \[isPending, startTransition\] = useTransition();
  if (isActive) {
    return <b\>{children}</b\>
  }
  if (isPending) {
    return <b className\="pending"\>{children}</b\>;
  }
  return (
    <button onClick\={() \=> {
      startTransition(() \=> {
        action();
      });
    }}\>
      {children}
    </button\>
  );
}

This results in losing DOM state the user has input. We can keep the state for the Contact tab by hiding the inactive Tabs with `<Activity>`:

import { useTransition } from 'react';

export default function TabButton({ action, children, isActive }) {
  const \[isPending, startTransition\] = useTransition();
  if (isActive) {
    return <b\>{children}</b\>
  }
  if (isPending) {
    return <b className\="pending"\>{children}</b\>;
  }
  return (
    <button onClick\={() \=> {
      startTransition(() \=> {
        action();
      });
    }}\>
      {children}
    </button\>
  );
}

* * *

## Troubleshooting[](#troubleshooting "Link for Troubleshooting ")

### Effects don’t mount when an Activity is hidden[](#effects-dont-mount-when-an-activity-is-hidden "Link for Effects don’t mount when an Activity is hidden ")

When an `<Activity>` is “hidden”, all Effects are unmounted. Conceptually, the component is unmounted, but React saves the state for later.

This is a feature of Activity because it means subscriptions won’t be subscribed for hidden parts of the UI, reducing the amount of work for hidden content. It also means cleanup, such as pausing a video (which would be expected if you unmounted without Activity) will fire. When an Activity switches to “visible”, it will mount by creating the Effects, which will subscribe and play the video.

Consider the following example, where a different video is played for each button:

import { useState, useRef, useEffect } from 'react';
import './checker.js';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() \=> {
    const videoRef = ref.current;
    videoRef.play();
    
    return () \=> {
      videoRef.pause();
    }
  }, \[\]);

  return <video ref\={ref} src\={src} muted loop playsInline/>;
}

export default function App() {
  const \[video, setVideo\] = useState(1);
  return (
    <\>
      <div\>
        <button onClick\={() \=> setVideo(1)}\>Big Buck Bunny</button\>
        <button onClick\={() \=> setVideo(2)}\>Elephants Dream</button\>
      </div\>
      {video === 1 &&
        <VideoPlayer key\={1}
          
          src\="https://archive.org/download/BigBuckBunny\_124/Content/big\_buck\_bunny\_720p\_surround.mp4" />

      }
      {video === 2 && 
        <VideoPlayer key\={2}
          
          src\="https://archive.org/download/ElephantsDream/ed\_1024\_512kb.mp4"
        />
      }
    </\>
  );
}

Whenever you change videos and come back, the video re-loads from the beginning. To maintain the state, you may try to render both videos, and hide the inactive video in `display: none`. However, this will cause both videos to play at the same time:

import { useState, useRef, useEffect } from 'react';
import VideoChecker from './checker.js';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() \=> {
    const videoRef = ref.current;
    videoRef.play();
    
    return () \=> {
      videoRef.pause();
    }
  }, \[\]);

  return <video ref\={ref} src\={src} muted loop playsInline/>;
}

export default function App() {
  const \[video, setVideo\] = useState(1);
  return (
    <\>
      <div\>
        <button onClick\={() \=> setVideo(1)}\>Big Buck Bunny</button\>
        <button onClick\={() \=> setVideo(2)}\>Elephants Dream</button\>
      </div\>
      <div style\={{display: video === 1 ? 'block' : 'none'}}\>
        <VideoPlayer
          
          src\="https://archive.org/download/BigBuckBunny\_124/Content/big\_buck\_bunny\_720p\_surround.mp4" />

      </div\>
      <div style\={{display: video === 2 ? 'block' : 'none'}}\>
        <VideoPlayer
          
          src\="https://archive.org/download/ElephantsDream/ed\_1024\_512kb.mp4"
        />
      </div\>
      <VideoChecker />
    </\>
  );
}

This is similar to what would happen if Activity mounted Effects when hidden. Similarly, if Activity didn’t unmount Effects when hiding, the videos would continue to play in the background.

Activity solves this by not creating Effects when first rendered as “hidden” and destroying all Effects when switching from “visible” to “hidden”:

import { useState, useRef, useEffect, unstable\_Activity as Activity } from 'react';
import VideoChecker from './checker.js';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() \=> {
    const videoRef = ref.current;
    videoRef.play();
    
    return () \=> {
      videoRef.pause();
    }
  }, \[\]);

  return <video ref\={ref} src\={src} muted loop playsInline/>;
}

export default function App() {
  const \[video, setVideo\] = useState(1);
  return (
    <\>
      <div\>
        <button onClick\={() \=> setVideo(1)}\>Big Buck Bunny</button\>
        <button onClick\={() \=> setVideo(2)}\>Elephants Dream</button\>
      </div\>
      <Activity mode\={video === 1 ? 'visible' : 'hidden'}\>
        <VideoPlayer
          
          src\="https://archive.org/download/BigBuckBunny\_124/Content/big\_buck\_bunny\_720p\_surround.mp4" />
      </Activity\>
      <Activity mode\={video === 2 ? 'visible' : 'hidden'}\>
        <VideoPlayer
          
          src\="https://archive.org/download/ElephantsDream/ed\_1024\_512kb.mp4"
        />
      </Activity\>
      <VideoChecker />
    </\>
  );
}

For this reason, it’s best to think of Activity conceptually as “unmounting” and “remounting” the component, but saving the React or DOM state for later. In practice, this works as expected if you have followed the [You Might Not Need an Effect](https://es.react.dev/learn/you-might-not-need-an-effect) guide. To eagerly find problematic Effects, we recommend adding [`<StrictMode>`](https://es.react.dev/reference/react/StrictMode) which will eagerly perform Activity unmounts and mounts to catch any unexpected side-effects.

### My hidden Activity is not rendered in SSR[](#my-hidden-activity-is-not-rendered-in-ssr "Link for My hidden Activity is not rendered in SSR ")

When you use `<Activity mode="hidden">` during server-side rendering, the content of the Activity will not be included in the SSR response. This is because the content is not visible on the page and is not needed for the initial render. If you need to include the content in the SSR response, you can use a different approach like [`useDeferredValue`](https://es.react.dev/reference/react/useDeferredValue) to defer rendering of the content.
