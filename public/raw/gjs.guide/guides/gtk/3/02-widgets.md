---
title: "Widgets and Other GTK Objects"
source: https://gjs.guide/guides/gtk/3/02-widgets.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Widgets and Other GTK Objects

## Widgets in GTK [​](#widgets-in-gtk)

For a list of all widgets in GTK go [here](https://developer.gnome.org/gtk3/stable/ch03.html);

## Signals [​](#signals)

Remember from 1.3, GTK is event-driven. When input is received by any GTK widget an action may be performed. _Signals_ allow us to create custom actions. GTK widgets communicate input by sending out a _signal_ which contains data about that input. You can listen for these signals and perform custom actions.

A standard example of listening to a signal would be:

js

```
button.connect('clicked', () => {
    log('The button was clicked');
});
```

In this example we call the `connect()` function on an already created `button` (we'll learn how to create buttons later). `connect()` takes two arguments the signal name - in this case `'clicked'` - and a callback. We're using an [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) to provide the callback. Every time this button is clicked a message will appear in the log saying `'The button was clicked'`.

\*Concepts utilized in this example: [Logging in GJS](https://gjs.guide/guides/gjs/intro.html).

## Widget Properties [​](#widget-properties)

In GTK every widget has properties. A `Gtk.Button` has a `label` property representing the text inside the button, a `Gtk.Image` has a `iconName` property representing the icon it is showing. You can find a list of the properties of any widget in the _Properties_ section of the widget's page on [DevDocs](https://gjs-docs.gnome.org/).

### Getting Properties [​](#getting-properties)

To access a property of a widget retrieve the value at the the property name in _lowerCamelCase_ in the widget object.

A few simple examples:

js

```
let iconName = image.iconName;
let buttonText = button.text;
```

_`image` and `button` are instances of `Gtk.Image` and `Gtk.Button` respectively_

### Setting Properties [​](#setting-properties)

To set the property of a widget use the provided setter function if available and, if not, set the value on the widget object.

A few simple examples:

js

```
button.set_label('Hello!');

/* or */

widget.someProp = 10;
```

_`button` is an instance of `Gtk.Button`. `widget` represents some widget with the property `someProp` which does not have a `set_some_prop()` function._

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
