---
title: "GValue | GNOME JavaScript"
source: https://gjs.guide/guides/gobject/gvalue.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# GValue | GNOME JavaScript

[`GObject.Value`](https://gjs-docs.gnome.org/gobject20/gobject.value) is a generic value container, usually only used to implement [GObject Properties](https://gjs.guide/guides/gobject/basics.html#properties) in projects written with the C programming language. By storing the value type alongside the value, it allows for dynamic type features usually not available to C programmers.

In JavaScript, this behavior is part of the language (i.e. `typeof`) and GJS will usually convert them automatically, but there are some situations that require using `GObject.Value` directly.

## Basic Usage [​](#basic-usage)

Before a newly created GValue can be used, it must be initialized to hold a specific [GType](https://gjs.guide/guides/gobject/gtype.html#type-constants):

js

```
const booleanValue = new GObject.Value();

// Initialize it to hold a boolean
booleanValue.init(GObject.TYPE_BOOLEAN);
```

The value can then be set directly, or passed to a function that takes it as an argument and sets the value.

js

```
const stringValue = new GObject.Value();
stringValue.init(GObject.TYPE_STRING);

// Set and get the value contents
stringValue.set_string('string value');
console.log(stringValue.get_string());
```

As of GJS 1.84 (GNOME 48), a `GObject.Value` can be initialized and set with the constructor:

js

```
const intValue = new GObject.Value(GObject.TYPE_INT, 1);
console.log(intValue.get_int());
```

The type of an initialized `GObject.Value` can be checked by calling [`GObject.type_check_value_holds()`](https://gjs-docs.gnome.org/gobject20/gobject.type_check_value_holds):

js

```
const doubleValue = new GObject.Value();
doubleValue.init(GObject.TYPE_DOUBLE);

if (GObject.type_check_value_holds(doubleValue, GObject.TYPE_DOUBLE))
    console.log('GValue initialized to hold double values');

if (!GObject.type_check_value_holds(doubleValue, GObject.TYPE_STRING))
    console.log('GValue not initialized to hold string values');
```

## GObject Properties [​](#gobject-properties)

Although you should always use JavaScript property accessors for native values, the `GObject.Object.get_property()` and `GObject.Object.set_property()` methods can be used to work with a `GObject.Value` that will be passed to another function.

js

```
const action = new Gio.SimpleAction({
    name: 'test',
    enabled: false,
});

// Create a new boolean GValue
const booleanValue = new GObject.Value();
booleanValue.init(GObject.TYPE_BOOLEAN);

// Get the GValue for a GObject property
action.get_property('enabled', booleanValue);
console.log(booleanValue.get_boolean());

// Set a GObject property from a GValue
booleanValue.set_boolean(true);
action.set_property('enabled', booleanValue);
```

## Return Values and Callback Arguments [​](#return-values-and-callback-arguments)

There are situations where a function may expect a particular value type (e.g. `GObject.TYPE_INT64`), but GJS can not determine this from the incoming type (e.g. `Number`). However, in most cases when `GObject.Value` is returned from functions or passed as callback arguments, they will be automatically unpacked.

Below is a non-functional example of Drag-n-Drop, where the `GObject.Value` is automatically unpacked for the `Gtk.DropTarget::drop` signal:

js

```
// Create a GObject to pass around
const objectInstance = new GObject.Object();

// A GValue can be used to pass data via Drag-n-Drop
const dragSource = new Gtk.DragSource({
    actions: Gtk.DragAction.COPY,
});

dragSource.connect('prepare', (_dragSource, _x, _y) => {
    const value = new GObject.Value();
    value.init(GObject.Object);
    value.set_object(objectInstance);

    return Gdk.ContentProvider.new_for_value(value);
});

// The Drag-n-Drop target receives the unpacked value
const dropTarget = Gtk.DropTarget.new(GObject.Object,
    Gdk.DragAction.COPY);

dropTarget.connect('drop', (_dropTarget, value, _x, _y) => {
    if (value instanceof GObject.Object)
        console.debug('The GObject.Value was unpacked to a GObject.Object');
});
```

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
