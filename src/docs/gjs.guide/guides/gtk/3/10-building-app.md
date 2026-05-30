---
title: "Building a GTK Application | GNOME JavaScript"
source: https://gjs.guide/guides/gtk/3/10-building-app.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Building a GTK Application | GNOME JavaScript

## Building a GTK Application [​](#building-a-gtk-application)

## Using `Gtk.Application` [​](#using-gtk-application)

So far we have only worked with small examples of GTK widgets. The way we displayed these widgets, adding them to a window and starting GTK, works but has several limitations:

*   No ability to name your application
*   No system integration for applications

These problems ensure that user's will have difficulty finding your application and using it. To solve these problems GTK provides `Gtk.Application`. `Gtk.Application` handles creating an application on the system and does much of the heavy-lifting to link together your advanced widgets.

## Creating a new application [​](#creating-a-new-application)

Let's modify the Image Viewer example from [Image](https://gjs.guide/guides/gtk/3/09-images.html) to utilize `Gtk.Application`:

First we need to import our depedencies...

js

```
#!/usr/bin/env gjs

imports.gi.versions.Gtk = "3.0";
const { Gio, Gtk } = imports.gi;

...
```

This looks almost exactly the same. _Note: We added Gio_.

Now let's move all of the image viewer code into an actual JavaScript class.

js

```
...

class ImageViewerWindow {
    constructor(app) {
        this._app = app;
        this._window = null;
        this._box = null;
        this._image = null;
        this._fileChooserButton = null;
    }

    _buildUI() {
        this._window = new Gtk.ApplicationWindow({
            application: this._app,
            defaultHeight: 600,
            defaultWidth: 800
        });
        this._box = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL
        });

        this._image = new Gtk.Image({
            vexpand: true
        });
        this._box.add(this._image);

        this._fileChooserButton = Gtk.FileChooserButton.new('Pick An Image', Gtk.FileChooserAction.OPEN);

        this._fileChooserButton.connect('file-set', () => {
            const fileName = this._fileChooserButton.get_filename();
            this._image.set_from_file(fileName);
        });

        this._box.add(this._fileChooserButton);
        this._box.show_all();

        this._window.add(this._box);
    }

    getWidget() {
        this._buildUI();
        return this._window;
    }
}

...
```

All of the user interface code has been moved into `_buildUI()` and all variables are now members of the class. We add added `this._box.show_all()` to make all the widgets visible as we no longer call `this._window.show_all()` to open the window. We created a `getWidget()` function to get the window from the class. We also now pass the application to the window to inform the window it is part of an application. _Note: We changed Gtk.Window to Gtk.ApplicationWindow_.

Now, we actually create the `Gtk.Application`.

js

```
...

const application = new Gtk.Application({
    application_id: 'org.gnome.Sandbox.ImageViewerExample',
    flags: Gio.ApplicationFlags.FLAGS_NONE
});

...
```

This will create a new application under the ID `org.gnome.Sandbox.ImageViewerExample`. Because this code sample is intended to run in GNOME Sandbox we made this application a "child" of `org.gnome.Sandbox`.

Now we will create our window.

js

```
...

application.connect('activate', app => {
    let activeWindow = app.activeWindow;

    if (!activeWindow) {
        let imageViewerWindow = new ImageViewerWindow(app);
        activeWindow = imageViewerWindow.getWidget();
    }

    activeWindow.present();
});

...
```

This code creates the window when the application is "activated". An application is "activated" when it is ready to display the user interface. Activation can happen multiple times (what if the application is hidden and then shown, for example) so we first check if there is already an active window. If there is not an active window we create our own. Finally, we "present" the window with `Gtk.Window.prototype.present()` which will show the window and then bring it to focus.

js

```
...

application.run(null);
```

Lastly, we run the application. This line replaces both `Gtk.init(null)` and `Gtk.main()`.

You should now have:

js

```
#!/usr/bin/env gjs

imports.gi.versions.Gtk = "3.0";
const { Gio, Gtk } = imports.gi;

class ImageViewerWindow {
    constructor(app) {
        this._app = app;
        this._window = null;
        this._box = null;
        this._image = null;
        this._fileChooserButton = null;
    }

    _buildUI() {
        this._window = new Gtk.ApplicationWindow({
            application: this._app,
            defaultHeight: 600,
            defaultWidth: 800
        });
        this._box = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL
        });

        this._image = new Gtk.Image({
            vexpand: true
        });
        this._box.add(this._image);

        this._fileChooserButton = Gtk.FileChooserButton.new('Pick An Image', Gtk.FileChooserAction.OPEN);

        this._fileChooserButton.connect('file-set', (button) => {
            const fileName = button.get_filename();
            this._image.set_from_file(fileName);
        });

        this._box.add(this._fileChooserButton);
        this._box.show_all();

        this._window.add(this._box);
    }

    getWidget() {
        this._buildUI();
        return this._window;
    }
}

const application = new Gtk.Application({
    application_id: 'org.gnome.Sandbox.ImageViewerExample',
    flags: Gio.ApplicationFlags.FLAGS_NONE
});

application.connect('activate', app => {
    let activeWindow = app.activeWindow;

    if (!activeWindow) {
        let imageViewerWindow = new ImageViewerWindow(app);
        activeWindow = imageViewerWindow.getWidget();
    }

    activeWindow.present();
});

application.run(null);
```

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
