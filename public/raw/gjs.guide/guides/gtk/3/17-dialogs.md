---
title: "Dialogs | GNOME JavaScript"
source: https://gjs.guide/guides/gtk/3/17-dialogs.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# Dialogs | GNOME JavaScript

Dialog boxes are a convenient way to prompt the user for a small amount of input, e.g. to display a message, ask a question, or anything else that does not require extensive effort on the user’s part.

[Learn More](https://gjs-docs.gnome.org/gtk30/gtk.dialog)

## `Gtk.MessageDialog` [​](#gtk-messagedialog)

`Gtk.MessageDialog` presents a dialog with some message text. It’s simply a convenience widget; you could construct the equivalent of `Gtk.MessageDialog` from `Gtk.Dialog` without too much effort, but `Gtk.MessageDialog` saves typing.

[Learn More](https://gjs-docs.gnome.org/gtk30/gtk.messagedialog)

### Creating a dialog [​](#creating-a-dialog)

To create the dialog we'll use `GtkMessageDialog`. GtkMessageDialog

js

```
let dialog = new Gtk.MessageDialog({
    title: 'Save?',
    text: 'Do you want to save your notes?',
    buttons: [Gtk.ButtonsType.NONE],
    parent: this,
    transient_for: this
})

dialog.add_button('Cancel', Gtk.ResponseType.CANCEL);
dialog.add_button('Close Without Saving', Gtk.ResponseType.NO);
dialog.add_button('Save Notes', Gtk.ResponseType.YES);
```

### Responding to the dialog [​](#responding-to-the-dialog)

Now we'll need to respond to the dialog. To do this we'll use the return result of `dialog.run()`.

js

```
let response = dialog.run();

if(response === Gtk.ResponseType.YES) {
  /* save code */
  /* exit code */
} else if (response === Gtk.ResponseType.NO) {
  /* exit code */
} else {
  /* do nothing */
}
```

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
