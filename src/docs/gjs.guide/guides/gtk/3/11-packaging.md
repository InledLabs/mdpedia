---
title: "Packaging | GNOME JavaScript"
source: https://gjs.guide/guides/gtk/3/11-packaging.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Packaging | GNOME JavaScript

While we now have the ability to create applications, we are limited to one script. This becomes impossible to manage as your application grows larger. This is where _Packaging_ comes in. Packaging your app in with the [GJS GTK Application Specification](https://gjs.guide/guides/gtk/application-packaging.html) makes it easy to set dependencies, start your application, distribute your application, and perhaps most importantly create large, multi-file projects.

_You can read more about the GJS GTK Application Specification [here](https://gjs.guide/guides/gtk/application-packaging.html)._

The specification is quite long and complex; luckily applications have already implemented it for you! In the next guide we will be explaining how to use GNOME Builder to create a packaged application.

## Setting dependencies with packaging [​](#setting-dependencies-with-packaging)

Before using any import from `imports.gi` you should set which version you expect to use.

js

```
pkg.require({
    'Gtk': '3.0',
    'Gio': '2.0'
});
```

`pkg` is a global utility object to access the packaging tools GJS provides. `pkg.require()` receives an object mapping dependency names to version strings. Always declare this before you use or import a library, ideally at the start of the file. This replaces `imports.gi.versions`.

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
