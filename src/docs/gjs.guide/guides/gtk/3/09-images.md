---
title: "Images | GNOME JavaScript"
source: https://gjs.guide/guides/gtk/3/09-images.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Images | GNOME JavaScript

## `Gtk.Image` [​](#gtk-image)

`Gtk.Image` is a widget which stores images from a variety of sources. It can display from a file, an icon name, or an array of pixels.

[Learn More](https://gjs-docs.gnome.org/gtk30-image/)

### Loading from a File [​](#loading-from-a-file)

In this example we've created a simple image viewer.

js

```
#!/usr/bin/env gjs

imports.gi.versions.Gtk = "3.0";
const { Gtk } = imports.gi;

Gtk.init(null);

const box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });

const image = new Gtk.Image({
    vexpand: true
});

box.add(image);

const button = Gtk.FileChooserButton.new('Pick An Image', Gtk.FileChooserAction.OPEN);

button.connect('file-set', () => {
    const fileName = button.get_filename();
    image.set_from_file(fileName);
});

box.add(button);

const win = new Gtk.Window({ defaultHeight: 600, defaultWidth: 800 });
win.connect('destroy', () => { Gtk.main_quit(); });
win.add(box);
win.show_all();

Gtk.main();
```

### Loading from an Icon Name & Adding an image to a `Gtk.Button` [​](#loading-from-an-icon-name-adding-an-image-to-a-gtk-button)

To load from an icon name, set the `iconName` property when constructing the image.

We can use this feature to place icons on buttons:

js

```
#!/usr/bin/env gjs

imports.gi.versions.Gtk = "3.0";
const { Gtk } = imports.gi;

Gtk.init(null);

const button = new Gtk.Button();
button.add(new Gtk.Image({ iconName: 'input-mouse' }))
button.connect('clicked', () => {
    log('The button was clicked!');
});

const win = new Gtk.Window({ defaultHeight: 600, defaultWidth: 800 });
win.connect('destroy', () => { Gtk.main_quit(); });
win.add(button);
win.show_all();

Gtk.main();
```

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
