---
title: "Port Extensions to GNOME Shell 47"
source: https://gjs.guide/extensions/upgrading/gnome-shell-47.html
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Port Extensions to GNOME Shell 47

## Metadata [​](#metadata)

TIP

There were no relevant changes to `metadata.json` in GNOME 47.

## Extension [​](#extension)

TIP

There were no relevant changes to `extension.js` in GNOME 47.

## Preferences [​](#preferences)

`getPreferencesWidget` and `fillPreferencesWindow` in `prefs.js` are now awaited when the preference window is opened.

## GNOME Shell [​](#gnome-shell)

### `GtkNotificationDaemonAppSource` [​](#gtknotificationdaemonappsource)

There is a new dbus parameter for the `ui/notificationDaemon.js/GtkNotificationDaemonAppSource.constructor()`.

Also, there is a new `emitActionInvoked()` method in this class to emit the `ActionInvoked` signal to the dbus.

### `overviewControls` [​](#overviewcontrols)

`ui/overviewControls.js/ControlsManagerLayout` class no longer uses `_spacing` property. Instead, the `spacing` parameter added to the `_computeWorkspacesBoxForState()` and `_getAppDisplayBoxForState()` methods.

### `PopupBaseMenuItem` [​](#popupbasemenuitem)

`PopupBaseMenuItem` no longer uses `selected` style class name when the menu item is selected. Instead, it is using `:selected` pseudo class.

### `misc/util.js` [​](#misc-util-js)

`ui/messageList.js/_fixMarkup()` moved to `misc/util.js/fixMarkup()`.

### Accent Color [​](#accent-color)

GNOME Shell 47 added the accent color to the Settings. The selected accent color is stored in the `org.gnome.desktop.interface.accent-color`.

To apply the accent color in `stylesheet.css`, you can use `-st-accent-color` and `-st-accent-fg-color`:

css

```
#panel {
    background-color: -st-accent-color;
}
```

## GJS [​](#gjs)

## `Clutter.Color` [​](#clutter-color)

`Clutter.Color` has been removed from the API. Its functionality was merged into [`Cogl.Color()`](https://gjs-docs.gnome.org/cogl15~15/cogl.color), which should be used instead.
