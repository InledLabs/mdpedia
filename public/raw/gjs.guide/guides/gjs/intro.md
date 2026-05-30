---
title: "Intro | GNOME JavaScript"
source: https://gjs.guide/guides/gjs/intro.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Intro | GNOME JavaScript

## GNOME JavaScript Introduction [​](#gnome-javascript-introduction)

Welcome to GNOME JavaScript (GJS)! This introduction covers the basics of how JavaScript is used with GJS. More detailed information about GJS is available in the [GJS Usage Documentation](https://gjs-docs.gnome.org/gjs).

## Platform and API [​](#platform-and-api)

Many APIs that JavaScript developers are familiar with are actually a part of the [Web API](https://developer.mozilla.org/docs/Web/API), such as DOM or Fetch. GJS is not intended as an environment for web development and does not include support for most of these APIs.

### GNOME Platform [​](#gnome-platform)

GJS provides JavaScript bindings for the GNOME platform libraries, meaning that developers will use libraries like [`Gio`](https://gjs-docs.gnome.org/gio20) for working with files, [`Gtk`](https://gjs-docs.gnome.org/gtk40) to build user interfaces, [`Soup`](https://gjs-docs.gnome.org/soup30) for WebSockets and so on.

### Web APIs [​](#web-apis)

TIP

See the documentation on [GJS Usage](https://gjs-docs.gnome.org/gjs/) for details about built-in modules and APIs.

Since the adoption of ES Modules, GJS has gained support for some widely used standards from the [Web API](https://developer.mozilla.org/docs/Web/API). These APIs may be more familiar to developers that have used other JavaScript environments.

#### Console API [​](#console-api)

As of GJS 1.70 (GNOME 41), the Console API is available as described in the [WHATWG Console Standard](https://console.spec.whatwg.org/). The `console` object is available globally without import.

#### Encoding API [​](#encoding-api)

As of GJS 1.70 (GNOME 41), the Encoding API is available as described in the [WHATWG Encoding Standard](https://encoding.spec.whatwg.org/). The `TextDecoder` and `TextEncoder` objects are available globally without import.

#### Timers API [​](#timers-api)

As of GJS 1.70 (GNOME 41), the Timers API is available as described in the [WHATWG HTML Standard](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers). The `setTimeout()`, `setInterval()`, `clearTimeout()` and `clearInterval()` methods are available globally without import.

## Imports and Modules [​](#imports-and-modules)

GJS uses standard ES Modules for imports and modules, but includes additional specifiers for platform libraries like `Gtk`.

### ES Modules [​](#es-modules)

As of GJS 1.68 (GNOME 40), standard [ES Modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) are supported and the preferred import method.

js

```
/* GJS's Built-in modules have custom specifiers */
import Cairo from 'cairo';
import Gettext from 'gettext';
import System from 'system';

/* Platform libraries use the gi:// URI in the specifier */
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';

/* Platform libraries with multiple versions may be defined at import */
import Gtk from 'gi://Gtk?version=4.0';

/* User modules may be imported using a relative path
 *
 * `utils.js` is in the subdirectory `lib`, relative to the current path. The
 * file extension is included in the import specifier.
 */
import * as Utils from './lib/utils.js';
```

### Legacy Imports [​](#legacy-imports)

WARNING

ES Modules should be preferred for new projects and existing projects should migrate when possible.

Prior to the ECMAScript standard for modules, GJS used a custom `imports` object.

js

```
/* GJS's Built-in modules are top-level properties */
const Cairo = imports.cairo;
const Gettext = imports.gettext;
const System = imports.system;

/* Platform libraries are properties of `gi` the object */
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;

/* Platform libraries with multiple versions must be defined before import */
imports.gi.versions.Gtk = '4.0';
const Gtk = imports.gi.Gtk;

/* User modules may be imported using a relative path
 *
 * `utils.js` is in the subdirectory `lib`, relative to the current path. The
 * file extension is omitted from the import specifier.
 */
const Utils = imports.lib.utils;
```

## Classes [​](#classes)

GJS uses standard JavaScript syntax for classes when possible, but includes additional syntax for GObject classes.

### ES Classes [​](#es-classes)

GJS uses standard [ES Classes](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes) for JavaScript classes.

js

```
class ClassExample {
    constructor() {
        this._initialized = true;
    }

    get example_property() {
        if (this._example_property === undefined)
            this._example_property = null;

        return this._example_property;
    }

    set example_property(value) {
        if (this.example_property === value)
            return;

        this._example_property = value;
    }
}
```

### GObject Classes [​](#gobject-classes)

The GNOME platform is built on the GObject type system, which brings object-oriented concepts to C. GJS uses special syntax to integrate with GObject.

js

```
import GObject from 'gi://GObject';


const SubclassExample = GObject.registerClass({
    GTypeName: 'SubclassExample',
    Properties: {
        'example-property': GObject.ParamSpec.boolean(
            'example-property',
            'Example Property',
            'A read-write boolean property',
            GObject.ParamFlags.READWRITE,
            true
        ),
    },
    Signals: {
        'example-signal': {},
    },
}, class SubclassExample extends GObject.Object {
    constructor(constructProperties = {}) {
        super(constructProperties);
    }

    get example_property() {
        if (this._example_property === undefined)
            this._example_property = null;

        return this._example_property;
    }

    set example_property(value) {
        if (this.example_property === value)
            return;

        this._example_property = value;
        this.notify('example-property');
    }
});
```

### Legacy Classes [​](#legacy-classes)

WARNING

ES Classes should be preferred for new projects and existing projects should migrate when possible.

Prior to the ECMAScript standard for classes, GJS used a custom syntax to integrate with GObject.

js

```
const Lang = imports.lang;

const GObject = imports.gi.GObject;


var ExampleSubclass = new Lang.Class({
    Name: 'ExampleSubclass',
    GTypeName: 'ExampleSubclass',
    Signals: {},
    InternalChildren: [],
    Children: [],
    Extends: GObject.Object,
    _init(constructArguments) {
        this.parent(constructArguments);
    },
});
```

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
