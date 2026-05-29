---
title: "Vue.js"
source: https://vuejs.org/guide/quick-start
author: Unknown
excerpt: Vue.js - The Progressive JavaScript Framework
---

> 💡 **Tip**: Explore all indexed documents for **vuejs.org** in the [Domain Index](/doc/vuejs.org/_index).

---

# Vue.js

## Quick Start [​](#quick-start)

## Try Vue Online [​](#try-vue-online)

*   To quickly get a taste of Vue, you can try it directly in our [Playground](https://play.vuejs.org/#eNo9jcEKwjAMhl/lt5fpQYfXUQfefAMvvRQbddC1pUuHUPrudg4HIcmXjyRZXEM4zYlEJ+T0iEPgXjn6BB8Zhp46WUZWDjCa9f6w9kAkTtH9CRinV4fmRtZ63H20Ztesqiylphqy3R5UYBqD1UyVAPk+9zkvV1CKbCv9poMLiTEfR2/IXpSoXomqZLtti/IFwVtA9A==).
    
*   If you prefer a plain HTML setup without any build steps, you can use this [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/) as your starting point.
    
*   If you are already familiar with Node.js and the concept of build tools, you can also try a complete build setup right within your browser on [StackBlitz](https://vite.new/vue).
    
*   To get a walkthrough of the recommended setup, watch this interactive [Scrimba](http://scrimba.com/links/vue-quickstart) tutorial that shows you how to run, edit, and deploy your first Vue app.
    

## Creating a Vue Application [​](#creating-a-vue-application)

Prerequisites

*   Familiarity with the command line
*   Install [Node.js](https://nodejs.org/) version `^20.19.0 || >=22.12.0`

In this section we will introduce how to scaffold a Vue [Single Page Application](https://vuejs.org/guide/extras/ways-of-using-vue#single-page-application-spa) on your local machine. The created project will be using a build setup based on [Vite](https://vite.dev/) and allow us to use Vue [Single-File Components](https://vuejs.org/guide/scaling-up/sfc) (SFCs).

Make sure you have an up-to-date version of [Node.js](https://nodejs.org/) installed and your current working directory is the one where you intend to create a project. Run the following command in your command line (without the `$` sign):

npmpnpmyarnbun

sh

```
$ npm create vue@latest
```

sh

```
$ pnpm create vue@latest
```

sh

```
# For Yarn (v1+)
$ yarn create vue

# For Yarn Modern (v2+)
$ yarn create vue@latest
  
# For Yarn ^v4.11
$ yarn dlx create-vue@latest
```

sh

```
$ bun create vue@latest
```

This command will install and execute [create-vue](https://github.com/vuejs/create-vue), the official Vue project scaffolding tool. You will be presented with prompts for several optional features such as TypeScript and testing support:

```
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Nightwatch / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

If you are unsure about an option, simply choose `No` by hitting enter for now. Once the project is created, follow the instructions to install dependencies and start the dev server:

npmpnpmyarnbun

sh

```
$ cd <your-project-name>
$ npm install
$ npm run dev
```

sh

```
$ cd <your-project-name>
$ pnpm install
$ pnpm run dev
```

sh

```
$ cd <your-project-name>
$ yarn
$ yarn dev
```

sh

```
$ cd <your-project-name>
$ bun install
$ bun run dev
```

You should now have your first Vue project running! Note that the example components in the generated project are written using the [Composition API](https://vuejs.org/guide/introduction#composition-api) and `<script setup>`, rather than the [Options API](https://vuejs.org/guide/introduction#options-api). Here are some additional tips:

*   The recommended IDE setup is [Visual Studio Code](https://code.visualstudio.com/) + [Vue - Official extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar). If you use other editors, check out the [IDE support section](https://vuejs.org/guide/scaling-up/tooling#ide-support).
*   More tooling details, including integration with backend frameworks, are discussed in the [Tooling Guide](https://vuejs.org/guide/scaling-up/tooling).
*   To learn more about the underlying build tool Vite, check out the [Vite docs](https://vite.dev/).
*   If you choose to use TypeScript, check out the [TypeScript Usage Guide](https://vuejs.org/guide/typescript/overview).

When you are ready to ship your app to production, run the following:

npmpnpmyarnbun

sh

```
$ npm run build
```

sh

```
$ pnpm run build
```

sh

```
$ yarn build
```

sh

```
$ bun run build
```

This will create a production-ready build of your app in the project's `./dist` directory. Check out the [Production Deployment Guide](https://vuejs.org/guide/best-practices/production-deployment) to learn more about shipping your app to production.

[Next Steps >](#next-steps)

## Using Vue from CDN [​](#using-vue-from-cdn)

You can use Vue directly from a CDN via a script tag:

html

```
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Here we are using [unpkg](https://unpkg.com/), but you can also use any CDN that serves npm packages, for example [jsdelivr](https://www.jsdelivr.com/package/npm/vue) or [cdnjs](https://cdnjs.com/libraries/vue). Of course, you can also download this file and serve it yourself.

When using Vue from a CDN, there is no "build step" involved. This makes the setup a lot simpler, and is suitable for enhancing static HTML or integrating with a backend framework. However, you won't be able to use the Single-File Component (SFC) syntax.

### Using the Global Build [​](#using-the-global-build)

The above link loads the _global build_ of Vue, where all top-level APIs are exposed as properties on the global `Vue` object. Here is a full example using the global build:

html

```
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/QWJwJLp)

html

```
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/eYQpQEG)

TIP

Many of the examples for Composition API throughout the guide will be using the `<script setup>` syntax, which requires build tools. If you intend to use Composition API without a build step, consult the usage of the [`setup()` option](https://vuejs.org/api/composition-api-setup).

### Using the ES Module Build [​](#using-the-es-module-build)

Throughout the rest of the documentation, we will be primarily using [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) syntax. Most modern browsers now support ES modules natively, so we can use Vue from a CDN via native ES modules like this:

html

```
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

html

```
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

Notice that we are using `<script type="module">`, and the imported CDN URL is pointing to the **ES modules build** of Vue instead.

### Enabling Import maps [​](#enabling-import-maps)

In the above example, we are importing from the full CDN URL, but in the rest of the documentation you will see code like this:

js

```
import { createApp } from 'vue'
```

We can teach the browser where to locate the `vue` import by using [Import Maps](https://caniuse.com/import-maps):

html

```
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/wvQKQyM)

html

```
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'vue'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/YzRyRYM)

You can also add entries for other dependencies to the import map - but make sure they point to the ES modules version of the library you intend to use.

Import Maps Browser Support

Import Maps is a relatively new browser feature. Make sure to use a browser within its [support range](https://caniuse.com/import-maps). In particular, it is only supported in Safari 16.4+.

Notes on Production Use

The examples so far are using the development build of Vue - if you intend to use Vue from a CDN in production, make sure to check out the [Production Deployment Guide](https://vuejs.org/guide/best-practices/production-deployment#without-build-tools).

While it is possible to use Vue without a build system, an alternative approach to consider is using [`vuejs/petite-vue`](https://github.com/vuejs/petite-vue) that could better suit the context where [`jquery/jquery`](https://github.com/jquery/jquery) (in the past) or [`alpinejs/alpine`](https://github.com/alpinejs/alpine) (in the present) might be used instead.

### Splitting Up the Modules [​](#splitting-up-the-modules)

As we dive deeper into the guide, we may need to split our code into separate JavaScript files so that they are easier to manage. For example:

index.html

html

```
<div id="app"></div>

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

my-component.js

js

```
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>Count is: {{ count }}</div>`
}
```

my-component.js

js

```
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>Count is: {{ count }}</div>`
}
```

If you directly open the above `index.html` in your browser, you will find that it throws an error because ES modules cannot work over the `file://` protocol, which is the protocol the browser uses when you open a local file.

Due to security reasons, ES modules can only work over the `http://` protocol, which is what the browsers use when opening pages on the web. In order for ES modules to work on our local machine, we need to serve the `index.html` over the `http://` protocol, with a local HTTP server.

To start a local HTTP server, first make sure you have [Node.js](https://nodejs.org/en/) installed, then run `npx serve` from the command line in the same directory where your HTML file is. You can also use any other HTTP server that can serve static files with the correct MIME types.

You may have noticed that the imported component's template is inlined as a JavaScript string. If you are using VS Code, you can install the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) extension and prefix the strings with a `/*html*/` comment to get syntax highlighting for them.

## Next Steps [​](#next-steps)

If you skipped the [Introduction](https://vuejs.org/guide/introduction), we strongly recommend reading it before moving on to the rest of the documentation.
