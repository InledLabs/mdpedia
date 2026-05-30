---
title: "Displaying Text | GNOME JavaScript"
source: https://gjs.guide/guides/gtk/3/06-text.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Displaying Text | GNOME JavaScript

## `Gtk.Label` [​](#gtk-label)

In GTK, the simplest way to display text is using `Gtk.Label`. A `Gtk.Label` can contain simple, standard text or a variety of text styles exclusively through [Pango Markup](https://docs.gtk.org/Pango/pango_markup.html).

[Learn More](https://gjs-docs.gnome.org/gtk30-label/)

## Standard Text [​](#standard-text)

To create a `Gtk.Label` with standard text simply pass the text as a JavaScript string to the `label` property of `Gtk.Label` in the constructor or using `Gtk.Label.prototype.set_label()`.

Here is a simple example:

js

```
#!/usr/bin/env gjs

imports.gi.versions.Gtk = "3.0";
const { Gtk } = imports.gi;

Gtk.init(null);

let label = new Gtk.Label({ label: 'Hello!' });
let win = new Gtk.Window();
win.add(label);
win.show_all();

Gtk.main();
```

## Markup [​](#markup)

To use markup you must pass `useMarkup` to the label.

Here is a simple example:

js

```
#!/usr/bin/env gjs

imports.gi.versions.Gtk = "3.0";
const { Gtk } = imports.gi;

Gtk.init(null);

let label = new Gtk.Label({
    useMarkup: true,
    label: '<b>Hello!</b>'
});
let win = new Gtk.Window();
win.add(label);
win.show_all();

Gtk.main();
```

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
