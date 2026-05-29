---
title: "St Widgets | GNOME JavaScript"
source: https://gjs.guide/extensions/topics/st-widgets.html
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# St Widgets | GNOME JavaScript

Modules in GNOME Shell like [`PopupMenu`](https://gitlab.gnome.org/GNOME/gnome-shell/-/tree/main/js/ui/popupMenu.js) have classes like `PopupMenuSection` and `PopupImageMenuItem` built on [`St.Widget`](https://gjs-docs.gnome.org/st13/st.widget). It's possible to modify and add other `St` widgets to these in extensions.

## Imports [​](#imports)

In order to use `St` widgets import the [`St`](https://gjs-docs.gnome.org/st13/st.widget) library.

js

```
import St from 'gi://St';
```

## Example Usage [​](#example-usage)

### Scrollview [​](#scrollview)

The following example shows how a [`St.ScrollView`](https://gjs-docs.gnome.org/st12~12/st.scrollview) widget can be added to a `PopupMenu`.

#### Example [​](#example)

js

```
// #region imports
import St from 'gi://St';
// #endregion imports

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

export default class ExampleExtension extends Extension {
    enable() {
        // Create a panel button
        this._indicator = new PanelMenu.Button(0.0, this.metadata.name, false);

        // Add an icon
        const icon = new St.Icon({
            icon_name: 'face-laugh-symbolic',
            style_class: 'system-status-icon',
        });
        this._indicator.add_child(icon);

        const scrollView = new St.ScrollView();

        const section1 = new PopupMenu.PopupMenuSection();

        //  Use add_actor() to add scrollview to  PopupMenuSection
        scrollView.add_actor(section1.actor);

        for (let i = 0; i < 30; i++) {
            const pmItem = new PopupMenu.PopupMenuItem(`This is item ${i}`, {});

            section1.addMenuItem(pmItem);
        }

        this._indicator.menu.box.add_child(scrollView);

        // Add the indicator to the panel
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;
    }
}
```
