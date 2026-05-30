---
title: "File Operations | GNOME JavaScript"
source: https://gjs.guide/guides/gio/file-operations.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# File Operations | GNOME JavaScript

The best way to operate on files in GJS is with [`Gio.File`](https://gjs-docs.gnome.org/gio20/gio.file), which is an abstraction of a file that can be treated like an object.

In contrast to the low-level functions available in GLib, `Gio.File` supports asynchronous operations and many utility functions for creating, reading, writing and querying information.

#### Promise Wrappers [​](#promise-wrappers)

This document uses asynchronous methods wrapped with [`Gio._promisify()`](https://gjs.guide/guides/gjs/asynchronous-programming.html#promisify-helper).

Copy & Paste

js

```
import Gio from 'gi://Gio';


/* Gio.File */
Gio._promisify(Gio.File.prototype, 'copy_async');
Gio._promisify(Gio.File.prototype, 'create_async');
Gio._promisify(Gio.File.prototype, 'delete_async');
Gio._promisify(Gio.File.prototype, 'enumerate_children_async');
Gio._promisify(Gio.File.prototype, 'load_contents_async');
Gio._promisify(Gio.File.prototype, 'make_directory_async');
Gio._promisify(Gio.File.prototype, 'move_async');
Gio._promisify(Gio.File.prototype, 'open_readwrite_async');
Gio._promisify(Gio.File.prototype, 'query_info_async');
Gio._promisify(Gio.File.prototype, 'replace_contents_async');
Gio._promisify(Gio.File.prototype, 'replace_contents_bytes_async',
    'replace_contents_finish');
Gio._promisify(Gio.File.prototype, 'trash_async');

/* Gio.FileEnumerator */
Gio._promisify(Gio.FileEnumerator.prototype, 'next_files_async');

/* Gio.InputStream */
Gio._promisify(Gio.InputStream.prototype, 'read_bytes_async');

/* Gio.OutputStream */
Gio._promisify(Gio.OutputStream.prototype, 'write_bytes_async');
```

## Getting a File Object [​](#getting-a-file-object)

Before you can create, read or write a file you need to create a `Gio.File` object to operate on. Below is a simple example of create a `Gio.File` instance for a file path:

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


// This is a useful method for building file paths from GLib. It will use the
// correct path separator for the current operating system (eg. `/` or `\`)
const filepath = GLib.build_filenamev([GLib.get_home_dir(), 'test-file.txt']);

const file = Gio.File.new_for_path(filepath);
```

You can also create a `Gio.File` instance from a URI, such as `file://` URIs. Note that this function will never fail to return a `Gio.File` object for a well-formed URI, but operations on the file will only succeed if the URI type is supported.

js

```
import Gio from 'gi://Gio';


const file = Gio.File.new_for_uri('file:///home/username/test-file.txt');
```

## Creating Files and Folders [​](#creating-files-and-folders)

A `Gio.File` object is only a representation of a file. To create a regular file on disk, you can use [`Gio.File.create()`](https://gjs-docs.gnome.org/gio20/gio.file#method-create):

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const file = Gio.File.new_for_path('test-file.txt');

const outputStream = await file.create_async(Gio.FileCreateFlags.NONE,
    GLib.PRIORITY_DEFAULT, null);

const bytes = new GLib.Bytes('some file content');
const bytesWritten = await outputStream.write_bytes_async(bytes,
    GLib.PRIORITY_DEFAULT, null);
```

If the file already exists, then `Gio.File.create()` will throw an error. If you want to replace an existing file, use [`Gio.File.replace()`](https://gjs-docs.gnome.org/gio20/gio.file#method-replace) instead and pass `Gio.FileCreateFlags.REPLACE_DESTINATION` in the flags argument.

Both `Gio.File.create()` and `Gio.File.replace()` open the file in write mode and return a [`Gio.FileOutputStream`](https://gjs-docs.gnome.org/gio20/gio.fileoutputstream) so that you can follow these calls by writing to the stream:

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const file = Gio.File.new_for_path('test-file.txt');

const outputStream = await file.create_async(Gio.FileCreateFlags.NONE,
    GLib.PRIORITY_DEFAULT, null);

const bytes = new GLib.Bytes('some file content');
const bytesWritten = await outputStream.write_bytes_async(bytes,
    GLib.PRIORITY_DEFAULT, null);
```

To create a directory instead, you can use [`Gio.File.make_directory()`](https://gjs-docs.gnome.org/gio20/gio.file#method-make_directory):

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const file = Gio.File.new_for_path('test-directory');

const success = await file.make_directory_async(GLib.PRIORITY_DEFAULT,
    null);
```

Note that this function will not make directories recursively, so you must use [`Gio.File.make_directory_with_parents()`](https://gjs-docs.gnome.org/gio20/gio.file#method-make_directory_with_parents) if you do want to do this manually. Unfortunately, there is no asynchronous version of this method in GIO.

js

```
import Gio from 'gi://Gio';


const file = Gio.File.new_for_path('test-directory');
const child = file.get_child('test-subdirectory');

// NOTE: This is a synchronous, blocking method
child.make_directory_with_parents(null);
```

## Simple Reading and Writing [​](#simple-reading-and-writing)

For simple operations like loading the contents of a file or writing contents out to file, you probably don't want to bother with I/O streams.

### Reading File Contents [​](#reading-file-contents)

To read the contents of a file, you can use [`Gio.File.load_contents()`](https://gjs-docs.gnome.org/gio20/gio.file#method-load_contents). The result of this operation will be a [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/uint8array). To convert this to a string, you can use [`TextDecoder()`](https://gjs-docs.gnome.org/gjs/encoding.md#textdecoder):

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const file = Gio.File.new_for_path('test-file.txt');

const [contents, etag] = await file.load_contents_async(null);

const decoder = new TextDecoder('utf-8');
const contentsString = decoder.decode(contents);
```

### Writing File Contents [​](#writing-file-contents)

To write contents to a file, you can use [`Gio.File.replace_contents()`](https://gjs-docs.gnome.org/gio20/gio.file#method-replace_contents).

Note that when writing contents asynchronously, it is strongly advised that you use [`Gio.File.replace_contents_bytes_async()`](https://gjs-docs.gnome.org/gio20~2.66p/gio.file#method-replace_contents_bytes_async). Not doing so may lead to file corruption if you are not very careful with the lifetime of the data.

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const file = Gio.File.new_for_path('test-file.txt');

const bytes = new GLib.Bytes('some file contents');
const [etag] = await file.replace_contents_bytes_async(bytes, null, false,
    Gio.FileCreateFlags.REPLACE_DESTINATION, null);
```

## Opening File Streams [​](#opening-file-streams)

When you want to perform more complicated operations on files or pipe the data to or from another source, you can open IO streams for a file instead.

For example, to open file in read-only mode you can use [`Gio.File.read()`](https://gjs-docs.gnome.org/gio20/gio.file#method-read). This will return a [`Gio.FileInputStream`](https://gjs-docs.gnome.org/gio20/gio.fileinputstream) so that you can follow this call by reading from the stream:

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const file = Gio.File.new_for_path('test-file.txt');

const inputStream = await file.read_async(GLib.PRIORITY_DEFAULT,
    null);

const contentsBytes = await inputStream.read_bytes_async(4096,
    GLib.PRIORITY_DEFAULT, null);
```

To open file in read-write mode instead, you can use [`Gio.File.open_readwrite()`](https://gjs-docs.gnome.org/gio20/gio.file#method-open_readwrite). This will return a [`Gio.FileIOStream`](https://gjs-docs.gnome.org/gio20/gio.fileiostream), which holds both a `Gio.FileInputStream` you can use for reading and a `Gio.FileOutputStream` you can use for writing:

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const file = Gio.File.new_for_path('test-file.txt');

const ioStream = await file.open_readwrite_async(GLib.PRIORITY_DEFAULT,
    null);

const inputStream = ioStream.get_input_stream();
const outputStream = ioStream.get_output_stream();
```

There are several other comparable methods you can use, depending on what operations you want to perform. See the documentation for the following methods for details:

*   [`Gio.File.append_to()`](https://gjs-docs.gnome.org/gio20/gio.file#method-append_to)
*   [`Gio.File.replace()`](https://gjs-docs.gnome.org/gio20/gio.file#method-replace)
*   [`Gio.File.replace_readwrite()`](https://gjs-docs.gnome.org/gio20/gio.file#method-replace_readwrite)

## Copying and Moving Files [​](#copying-and-moving-files)

To copy files from one location to another, you will need a `Gio.File` object for both the source and target locations. Once you have those, you can use [`Gio.File.copy()`](https://gjs-docs.gnome.org/gio20/gio.file#method-copy) to copy the file.

Be sure to review the [`Gio.FileCopyFlags`](https://gjs-docs.gnome.org/gio20/gio.filecopyflags) documentation, to select the correct flags for the operation you want to perform.

Note that `Gio.File.copy()` will not copy non-empty directories, nor will it recursively copy files. To do that you must recursively copy files manually.

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const source = Gio.File.new_for_path('test-file.txt');
const target = Gio.File.new_for_path('test-copy.txt');

await source.copy_async(target, Gio.FileCopyFlags.NONE, GLib.PRIORITY_DEFAULT,
    // Gio.FileProgressCallback
    (nWritten, nTotal) => {
        const percent = Math.floor(100 * (nWritten / nTotal));
        console.debug(`Progress: ${percent}%`);
    });
```

If you want to move a file instead of copying it, you can use [`Gio.File.move()`](https://gjs-docs.gnome.org/gio20/gio.file#method-move). Unlike `Gio.File.copy()`, this function can move entire directories of files.

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const source = Gio.File.new_for_path('test-file.txt');
const target = Gio.File.new_for_path('test-move.txt');

await source.move_async(target, Gio.FileCopyFlags.NONE, GLib.PRIORITY_DEFAULT,
    null);
```

## Deleting Files [​](#deleting-files)

To delete files, you can use [`Gio.File.delete()`](https://gjs-docs.gnome.org/gio20/gio.file#method-delete):

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const file = Gio.File.new_for_path('test-file.txt');

await file.delete_async(GLib.PRIORITY_DEFAULT, null);
```

Note that `Gio.File.delete()` will not delete non-empty directories, nor will it recursively delete files. To do that you must recursively delete files manually.

You may, however, use [`Gio.File.trash()`](https://gjs-docs.gnome.org/gio20/gio.file#method-trash) to send entire directories of files to the user's Trash:

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const file = Gio.File.new_for_path('test-file.txt');

await file.trash_async(GLib.PRIORITY_DEFAULT, null);
```

## Getting File Information [​](#getting-file-information)

To query file information, you can use [`Gio.File.query_info()`](https://gjs-docs.gnome.org/gio20/gio.file#method-query_info) which will return a [`Gio.FileInfo`](https://gjs-docs.gnome.org/gio20/gio.fileinfo). Depending on the attributes you request, the returned `Gio.FileInfo` object can be used to retrieve different information about the file.

In the example below, all the standard attributes are pulled in by passing the string `standard::*`. This could also be a list of specific namespaces and attributes like `standard::name,standard::type,unix::uid`, but usually everything you need will be included in `standard::*`.

You will also notice the flag `Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS`, which indicates that if the `Gio.File` object represents a symbolic link that the info for the link itself is being requested, not the file it points to.

For attributes in the `standard` namespace there are convenience methods like [`Gio.FileInfo.get_size()`](https://gjs-docs.gnome.org/gio20/gio.fileinfo#method-get_size), but others require methods like [`Gio.FileInfo.get_attribute_uint32()`](https://gjs-docs.gnome.org/gio20/gio.fileinfo#method-get_attribute_uint32).

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const file = Gio.File.new_for_path('test-file.txt');

const fileInfo = await file.query_info_async('standard::*,unix::uid',
    Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS, GLib.PRIORITY_DEFAULT, null);

// Attributes in the `standard` namespace
const fileName = fileInfo.get_name();
const fileSize = fileInfo.get_size();

// Attributes in other namespaces
const unixMode = fileInfo.get_attribute_uint32('unix::uid');
```

## Navigating Files and Directories [​](#navigating-files-and-directories)

Navigating files and directories is quite simple, if you already know what you're looking for. The [`Gio.File.get_child()`](https://gjs-docs.gnome.org/gio20/gio.file#method-get_child) and [`Gio.File.get_parent()`](https://gjs-docs.gnome.org/gio20/gio.file#method-get_parent) methods take a string and return a `Gio.File` object for that path:

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


// Our starting point, in the current working directory
const cwd = Gio.File.new_for_path('.');

// A child of the directory
const childFile = cwd.get_child('test-file.txt');

// The parent directory
const parentDir = cwd.get_parent();

// A child of the parent directory
const parentFile = parentDir.get_child('parent-file.txt');
```

If you don't know the files you're looking for, you can instead list the files and iterate them with [`Gio.File.enumerate_children()`](https://gjs-docs.gnome.org/gio20/gio.file#method-enumerate_children). This method will return a [`Gio.FileEnumerator`](https://gjs-docs.gnome.org/gio20/gio.fileenumerator) that you can call [`Gio.FileEnumerator.next_file()`](https://gjs-docs.gnome.org/gio20/gio.fileenumerator#method-next_file) on to retrieve a `Gio.FileInfo` object for each file.

As of GJS 1.74 (GNOME 43), `Gio.FileEnumerator` supports the JavaScript asynchronous and synchronous iterator protocols, making iterating directories very straight-forward:

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const directory = Gio.File.new_for_path('.');

const iter = await directory.enumerate_children_async('standard::*',
    Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS, GLib.PRIORITY_DEFAULT, null);

for await (const fileInfo of iter)
    console.debug(fileInfo.get_name());
```

The only benefit to enumerating files manually, is the ability to query multiple files in a single call, which may have better performance:

js

```
/* eslint-disable no-await-in-loop */

import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


const directory = Gio.File.new_for_path('.');

const iter = await directory.enumerate_children_async('standard::*',
    Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS, GLib.PRIORITY_DEFAULT, null);

while (true) {
    const fileInfos = await iter.next_files_async(10, // max results
        GLib.PRIORITY_DEFAULT, null);

    if (fileInfos.length === 0)
        break;

    for (const fileInfo of fileInfos)
        console.debug(fileInfo.get_name());
}
```

## Monitoring Files and Directories [​](#monitoring-files-and-directories)

NOTE

You must hold a reference to a [`Gio.FileMonitor`](https://gjs-docs.gnome.org/gio20/gio.filemonitor) object, or it will be collected and emit no signals.

It is possible to monitor files and directories for changes with `Gio.File`. You can use [`Gio.File.monitor()`](https://gjs-docs.gnome.org/gio20/gio.file#method-monitor) to monitor a file or directory for changes.

Be sure to review the [`Gio.FileMonitorFlags`](https://gjs-docs.gnome.org/gio20/gio.filemonitorflags) documentation, to select the correct flags for the operations you want to monitor.

js

```
import Gio from 'gi://Gio';


const directory = Gio.File.new_for_path('.');

const fileMonitor = directory.monitor(Gio.FileMonitorFlags.WATCH_MOVES, null);

fileMonitor.connect('changed', (_fileMonitor, file, otherFile, eventType) => {
    switch (eventType) {
    case Gio.FileMonitorEvent.CHANGED:
        console.log(`${otherFile.get_basename()} was changed`);
        break;

    case Gio.FileMonitorEvent.DELETED:
        console.log(`${otherFile.get_basename()} was deleted`);
        break;

    case Gio.FileMonitorEvent.CREATED:
        console.log(`${otherFile.get_basename()} was created`);
        break;

    case Gio.FileMonitorEvent.MOVED_IN:
        console.log(`${otherFile.get_basename()} was moved into the directory`);
        break;

    case Gio.FileMonitorEvent.MOVED_OUT:
        console.log(`${otherFile.get_basename()} was moved out of the directory`);
        break;
    }
});
```

## Complex Examples [​](#complex-examples)

A few more complex examples may be useful, to show how `Gio.File` can be used to solve large or complicated problems without blocking the main thread.

### Recursively Operating on Files [​](#recursively-operating-on-files)

Trash, deleting an entire directory of files is still a pretty common task.

It is also useful way to demonstrate how to walk a tree of files and call a function on each file based on its type.

js

```
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';


/**
 * Callback signature for recursiveFileOperation().
 *
 * The example callback `recursiveDeleteCallback()` demonstrates how to
 * recursively delete a directory of files, while skipping unsupported file types.
 *
 * @param {Gio.File} file - the file to operate on
 * @param {Gio.FileType} fileType - the file type
 * @param {Gio.Cancellable} [cancellable] - optional cancellable
 * @returns {Promise|null} a Promise for the operation, or %null to ignore
 */
function recursiveDeleteCallback(file, fileType, cancellable = null) {
    switch (fileType) {
    case Gio.FileType.REGULAR:
    case Gio.FileType.SYMBOLIC_LINK:
        return file.delete(cancellable);

    case Gio.FileType.DIRECTORY:
        return recursiveFileOperation(file, recursiveDeleteCallback,
            cancellable);

    default:
        return null;
    }
}


/**
 * Recursively operate on @file and any children it may have.
 *
 * @param {Gio.File} file - the file or directory to delete
 * @param {Function} callback - a function that will be passed the file,
 *     file type (e.g. regular, directory), and @cancellable
 * @param {Gio.Cancellable} [cancellable] - optional cancellable
 * @returns {Promise} a Promise for the operation
 */
async function recursiveFileOperation(file, callback, cancellable = null) {
    const fileInfo = await file.query_info_async('standard::type',
        Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS, GLib.PRIORITY_DEFAULT,
        cancellable);
    const fileType = fileInfo.get_file_type();

    // If @file is a directory, collect all the operations as Promise branches
    // and resolve them in parallel
    if (fileType === Gio.FileType.DIRECTORY) {
        const iter = await file.enumerate_children_async('standard::type',
            Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS, GLib.PRIORITY_DEFAULT,
            cancellable);

        const branches = [];

        while (true) {
            // eslint-disable-next-line
            const fileInfos = await iter.next_files_async(10, // max files
                GLib.PRIORITY_DEFAULT, cancellable);

            if (fileInfos.length === 0)
                break;

            for (const info of fileInfos) {
                const child = iter.get_child(info);
                const childType = info.get_file_type();

                // The callback decides whether to process a file, including
                // whether to recurse into a directory
                const branch = callback(child, childType, cancellable);

                if (branch)
                    branches.push(branch);
            }
        }

        await Promise.all(branches);
    }

    // Return the Promise for the top-level file
    return callback(file, cancellable);
}
```

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
