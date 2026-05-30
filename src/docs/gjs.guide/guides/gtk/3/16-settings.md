---
title: "Application Settings | GNOME JavaScript"
source: https://gjs.guide/guides/gtk/3/16-settings.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Application Settings | GNOME JavaScript

We just learned how to save application data to files. While this is appropriate for storing data relevant to the user's activities and any user-generated content, application-level settings should utilize the built-in GSettings APIs.

## Defining a Schema [​](#defining-a-schema)

Before we can store any settings we must inform GSettings what we want to store. We do this with a _schema file_.

In your template or GNOME Builder Project you should find a file named `[your.app.id].gschema.xml`.

Its contents should look roughly like this:

xml

```
<?xml version="1.0" encoding="UTF-8"?>
<schemalist gettext-domain="[App Name]">
	<schema id="[your.app.id]" path="[your/app/path]">
	</schema>
</schemalist>
```

## Adding a setting [​](#adding-a-setting)

To add a setting you must add a `<key>` to `<schema>`.

A typical key looks like this:

xml

```
<key name="is-running" type="b">
    <default>false</default>
    <summary>Running state</summary>
    <description>Describes if it is running</description>
</key>
```

`name=` sets the name of the setting. This is used to retrieve and modify the setting's value. `type=` sets the type of the setting. A complete list of types is available [here](https://developer.gnome.org/glib/stable/glib-GVariantType.html#GVariantType). `<default>` lists the default value of the setting. `<summary>` briefly describes the purpose of the setting. `<description>` provides a longer, more detailed explanation of the setting.

Once added, your settings file should look like this:

xml

```
<<?xml version="1.0" encoding="UTF-8"?>
<schemalist gettext-domain="[app-name]">
	<schema id="[your.app.id]" path="[your/app/path]">
        <key name="is-running" type="b">
            <default>false</default>
            <summary>Running state</summary>
            <description>Describes if it is running</description>
        </key>
	</schema>
</schemalist>
```

## Accessing settings [​](#accessing-settings)

To access settings in your app you need a `Gio.Settings` instance:

js

```
const settings = new Gio.Settings({ settings_id: '[your.app.id]' });
```

Now you can retrieve settings with `settings.get_{type}(name)`.

For example:

`const isRunning = settings.get_boolean('is-running');`

You can find a complete list of getters [here](https://gjs-docs.gnome.org/gio20/gio.settings).

## Setting, a setting. [​](#setting-a-setting)

Setting your new setting's value is quite similar to getting it. Simply call `settings.set_{type}(name, value)`.

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
