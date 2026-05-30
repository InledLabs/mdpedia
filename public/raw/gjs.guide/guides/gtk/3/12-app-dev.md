---
title: "Setting Up Your Application Development Environment"
source: https://gjs.guide/guides/gtk/3/12-app-dev.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Setting Up Your Application Development Environment

For developing packaged applications in GJS we highly recommend [GNOME Builder](https://wiki.gnome.org/Apps/Builder). GNOME Builder can download the latest GJS version for you and provides support for developing secure, structured GNOME applications.

If you do not have GNOME Builder installed you can get it [here](https://flathub.org/apps/details/org.gnome.Builder).

## Using GNOME Builder [​](#using-gnome-builder)

### Creating a New GJS GTK Application Project [​](#creating-a-new-gjs-gtk-application-project)

![](https://gjs.guide/assets/img/builder-01.png)

First open GNOME Builder and select `New...` to create a new project.

![](https://gjs.guide/assets/img/builder-02.png)

Choose `JavaScript` and `GNOME Application` so GNOME Builder correctly configures and creates a template for you to build your first project from.

![](https://gjs.guide/assets/img/builder-03.png)

### Configuring the Runtime Environment [​](#configuring-the-runtime-environment)

Go to build settings.

In your application ensure that the runtime environment is set to Gnome Platform 3.28 or higher.

## Working in Other IDES [​](#working-in-other-ides)

If you are working in another IDE it is possible but more complicated.

### Download the Template [​](#download-the-template)

First, download the application template (or use `git clone [link]`)

### Install GJS [​](#install-gjs)

Install GJS from any of the packages below.

*   [Ubuntu 18.04](https://packages.ubuntu.com/bionic/gjs)
*   [Fedora 28](https://fedora.pkgs.org/28/fedora-x86_64/gjs-1.52.2-1.fc28.x86_64.rpm.html)
*   [Debian](https://packages.debian.org/buster/gjs) _Warning: Out of Date In Stretch_
*   [Arch Linux](https://www.archlinux.org/packages/extra/x86_64/gjs/)
*   more at [pkgs.org](https://pkgs.org/download/gjs)

### Verifying Your GJS Version [​](#verifying-your-gjs-version)

Verify your system has a recent version of GJS. Type...

```
gjs --version
```

...into a terminal. If your version is below 1.50.x it is recommended you use [GNOME Builder](https://flathub.org/apps/details/org.gnome.Builder) or build GJS from source.

### Building Your Project [​](#building-your-project)

To build your project open a terminal in your project's root directory and type the following...

```
meson --set-prefix=***/your/project/directory***/run/
```

...to initialize Meson. Now type...

```
mkdir build && cd build && ninja && ninja build
```

### Running Your Project [​](#running-your-project)

Type...

```
./run/**your.app.name**
```

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
