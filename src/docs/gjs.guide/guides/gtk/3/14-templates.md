---
title: "Loading User Interface Files In GJS"
source: https://gjs.guide/guides/gtk/3/14-templates.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Loading User Interface Files In GJS

## Loading User Interface Files In GJS [​](#loading-user-interface-files-in-gjs)

The user interface file you have created, `window.ui`, is a template for your application. To use this template and its widgets we need to load it.

## Loading the template [​](#loading-the-template)

Luckily, in GJS it is quite simple to load a user interface template.

js

```
/* imports */
var X = GObject.registerClass({
    Template: 'url://templateurl'
}, class X extends Gtk.ApplicationWindow {
    /* implementation */
});
}
```

You will find the above code in your project's `window.js` file. This code tells GTK to register the class and apply a GTK user interface template to it.

We now have the template, but how do we access the widgets?

Before we had variables like this:

js

```
const button = new Button();
button.do_something();
```

So it was easy to call functions and manipulate the button. To achieve a similar system with templates you have to tell GTK what widgets you want to use by passing a list of their IDs to `InternalChildren`.

js

```
/* imports */
GObject.registerClass({
    Template: 'url://templateurl',
    InternalChildren: ['button']
}, class X extends GObject.Object {
    /* implementation */
});
```

## Accessing template children [​](#accessing-template-children)

Now you can access the button like this:

js

```
this._button.do_something();
```

All template widgets listend in `InternalChildren` are accessible with the pattern `this._[childName]`.

_Note the prefixed underscore!_

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
