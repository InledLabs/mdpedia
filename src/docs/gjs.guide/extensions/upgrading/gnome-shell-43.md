---
title: "Port Extensions to GNOME Shell 43"
source: https://gjs.guide/extensions/upgrading/gnome-shell-43.html
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Port Extensions to GNOME Shell 43

TIP

There were no relevant changes to `metadata.json` in GNOME 43.

## Extension [​](#extension)

TIP

There were no relevant changes to `extension.js` in GNOME 43.

## GNOME Shell [​](#gnome-shell)

### Quick Settings [​](#quick-settings)

GNOME Shell 43 removed `aggregateMenu` and uses quick settings instead:

Type

Where

Direct access

`Main.panel.statusArea.quickSettings`

Columns count

`ui.panel.N_QUICK_SETTINGS_COLUMNS`

Panel menu button

`ui.panel.QuickSettings`

[ui.quickSettings](https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js) is a new module for:

Name

Use Case

QuickToggle

The primary entry point to create toggle button.

QuickMenuToggle

Same as _QuickToggle_ but with menu.

QuickSlider

To create slider like brightness and volume control (that are already built-in).

QuickSettingsMenu

To add another quick settings menu instead of adding items to the existing `Main.panel.statusArea.quickSettings`.

Learn how to implement quick settings with [examples](https://gjs.guide/extensions/topics/quick-settings.html).

### Screen Sharing Indicator [​](#screen-sharing-indicator)

GNOME Shell 43 also have a new screen sharing indicator in panel:

Type

Where

Direct access

`Main.panel.statusArea.screenSharing`

### App display [​](#app-display)

App display have new `AppGrid` and `BaseAppViewGridLayout` class.

The grid layout allows you to manage the layout such as going to another page and toggling the page indicators visibility.

### Signals [​](#signals)

In GNOME Shell 43, instead of using `Signals.addSignalMethods()`, you can extend your class to `Signals.EventEmitter`.

To do that, you need to use [misc.signals](https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/misc/signals.js) module:

js

```
const Signals = imports.misc.signals;

var MyClass = class extends Signals.EventEmitter {
    constructor() {
        super();
    }
}
```

### Soup3 [​](#soup3)

GNOME Shell 43 uses [Soup 3](https://gjs-docs.gnome.org/soup30/) as default.

Soup 3 API is different from what we had in version 2.

For example, here we post `id` and receive the result asynchronously:

js

```
const {Soup, GLib} = imports.gi;

let session = new Soup.Session();

let params = {
    id: '1',
};

let message = Soup.Message.new_from_encoded_form(
    'POST',
    'https://example.com/',
    Soup.form_encode_hash(params)
);

session.send_and_read_async(
    message,
    GLib.PRIORITY_DEFAULT,
    null,
    (session, result) => {
        if (message.get_status() === Soup.Status.OK) {
            let bytes = session.send_and_read_finish(result);
            let decoder = new TextDecoder('utf-8');
            let response = decoder.decode(bytes.get_data());
            console.log(`Response: ${response}`);
        }
    }
);
```

## GJS [​](#gjs)

TIP

There were no relevant changes to GJS in GNOME 43.
