---
title: "Saving Application Data | GNOME JavaScript"
source: https://gjs.guide/guides/gtk/3/15-saving-data.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Saving Application Data | GNOME JavaScript

We now have a full GTK application working! For many applications, though, storing user data is critical for functionality. A common example might be reopening the data or file that was in use before the application previously exited.

## Converting Data [​](#converting-data)

Let's start with a simple data object. This will store the last used file by the user.

js

```
let lastUsedFile = {
    fileName: "/file/path/is/here",
    fileDescription: "this is a description of the file"
};
```

We first need to convert it to JSON for storage. GJS has built-in functions for this:

js

```
let dataJSON = JSON.stringify(lastUsedFile);
```

## Locating Where To Save Data [​](#locating-where-to-save-data)

Now we need to save `dataJSON`. Applications typically store data in their local configuration directory. You may know this as `~/.config/example-application/` but it varies on some systems so we should always use GLib's APIs to find it.

js

```
let dataDir = GLib.get_user_config_dir();
```

Now that we have the directory, we can build the storage path.

js

```
let destination = GLib.build_filenamev([dataDir, 'example-application', 'lastFile.json']);
```

This code builds the destination path string. We use `GLib.build_filenamev` to handle special cases where simple `/` strings don't work!

_Always look for official APIs to handle file names!_

## Saving Data To A File [​](#saving-data-to-a-file)

Now let's finish up by actually writing to the file.

js

```
let destinationFile = Gio.File.new_for_path(destination);

if (GLib.mkdir_with_parents(destinationFile.get_parent().get_path(), PERMISSIONS_MODE) === 0) {
    let [success, tag] = file.replace_contents(dataJSON, null, false, Gio.FileCreateFlags.REPLACE_DESTINATION, null);

    if(success) {
        /* it worked! */
    } else {
        /* it failed */
    }
} else {
     /* error */
}
```

This code comes from [GIO File Operations](https://gjs.guide/guides/gio/file-operations.html).

_**And it is saved!**_

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
