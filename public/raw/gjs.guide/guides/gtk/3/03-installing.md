---
title: "Installing GJS and Running The Examples"
source: https://gjs.guide/guides/gtk/3/03-installing.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Installing GJS and Running The Examples

## Installing GJS and Running The Examples [​](#installing-gjs-and-running-the-examples)

*   [Using The Command Line](#using-the-command-line)
    *   [Installing GJS](#installing-gjs)
    *   [Verifying Your GJS Version](#verifying-your-gjs-version)
    *   [Running A Tutorial](#running-a-tutorial)

This guide is built for running the examples you will encounter in the first half of this guide, for setting up an application development environment go [here](https://gjs.guide/guides/gtk/3/12-app-dev.html#using-gnome-builder);

## Using The Command Line [​](#using-the-command-line)

Using the command line is possible but can be difficult if your distribution is not running a modern version of GJS by default. Beginning examples may function properly, while more advanced topics fail due to missing features.

### Installing GJS [​](#installing-gjs)

Install GJS from any of the packages below.

*   Ubuntu 18.04
*   Debian Stretch
*   Arch Linux
*   more at [pkgs.org](https://pkgs.org/)

### Verifying Your GJS Version [​](#verifying-your-gjs-version)

Verify your system has a recent version of GJS. Type...

```
gjs --version
```

...into a terminal. If your version is below 1.48.x it is recommended you use [GNOME Builder](https://wiki.gnome.org/Apps/Builder) or build GJS from source.

### Running A Tutorial [​](#running-a-tutorial)

Open a new file and place the code you would like to run in a code viewer of your choosing.

Save the code to a file, `file.js`.

Run this in terminal:

```
gjs file.js
```

The program output will appear in the terminal.

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
