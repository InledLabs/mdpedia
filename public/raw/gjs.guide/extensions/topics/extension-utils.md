---
title: "ExtensionUtils | GNOME JavaScript"
source: https://gjs.guide/extensions/topics/extension-utils.html
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# ExtensionUtils | GNOME JavaScript

TIP

This documentation is for GNOME Shell 44 and earlier. See [Extension (ESModule)](https://gjs.guide/extensions/topics/extension.html) for GNOME Shell 45 and later.

The [`ExtensionUtils`](https://gitlab.gnome.org/GNOME/gnome-shell/tree/main/js/misc/extensionUtils.js) module contains convenience functions for GNOME Shell extensions, used to get metadata about the current extension and utilities for Gettext translations and GSettings.

For each extension, GNOME Shell maintains an object that represents its state and metadata. This object can be retrieved for the current extension with [`ExtensionUtils.getCurrentExtension()`](#extensionutils-getcurrentextension).

#### `ExtensionUtils.ExtensionType` [​](#extensionutils-extensiontype)

The `ExtensionType` usually just indicates whether it was installed in `~/.local/share/gnome-shell/extensions` by the user, or installed to `/usr/share/gnome-shell/extensions` by a package manager.

*   `ExtensionUtils.ExtensionType`
    *   `ExtensionUtils.ExtensionType.SYSTEM` — A system extension
    *   `ExtensionUtils.ExtensionType.PER_USER` — A user extension

#### Extension Object [​](#extension-object)

*   `metadata` (`Object`) — The contents of the `metadata.json` file (JavaScript: read-only)
*   `uuid` (`String`) — The extension UUID (JavaScript: read-only)
*   `type` (`ExtensionType`) — The extension type (JavaScript: read-only)
*   `dir` (`Gio.File`) — The extension directory as a [`Gio.File`](https://gjs-docs.gnome.org/gio20/gio.file) (JavaScript: read-only)
*   `path` (`String`) — The extension directory as a path (JavaScript: read-only)
*   `error` (`String`) — An error message or an empty string if no error (JavaScript: read-only)
*   `hasPrefs` (`Boolean`) — whether the extension has a preferences UI (JavaScript: read-only)
*   `hasUpdate` (`Boolean`) — Whether the extension has a pending update (JavaScript: read-only)
*   `canChange` (`Boolean`) — Whether the extension can be enabled/disabled (JavaScript: read-only)
*   `sessionModes` (`Array(String)`) — A list of supported session modes (JavaScript: read-only)

## General Utilities [​](#general-utilities)

#### `ExtensionUtils.getCurrentExtension()` [​](#extensionutils-getcurrentextension)

Type:

*   Static

Returns:

*   (`Object`|`null`) — An [Extension Object](#extension-object)

Gets the [Extension Metadata](#extension-object) for the current extension, or `null` if not called from an extension.

## Gettext Translations [​](#gettext-translations)

TIP

See the development page for [Translations](https://gjs.guide/extensions/development/translations.html) for examples of how to use these utilities.

#### `ExtensionUtils.initTranslations(domain)` [​](#extensionutils-inittranslations-domain)

Type:

*   Static

Parameters:

*   domain (`String`) — The gettext domain to use

Initialize Gettext to load translations from the `locale` subdirectory of the extension directory. If `domain` is not provided, it will be taken from the [`gettext-domain`](https://gjs.guide/extensions/overview/anatomy.html#gettext-domain) field in the extension's [`metadata.json`](https://gjs.guide/extensions/overview/anatomy.html#metadata-json-required) file.

#### `ExtensionUtils.gettext(str)` [​](#extensionutils-gettext-str)

Type:

*   Static

Parameters:

*   str (`String`) — The string to translate

Returns:

*   (`String`) — The translated string

Translate @str using the extension's gettext domain

#### `ExtensionUtils.ngettext(str, strPlural, n)` [​](#extensionutils-ngettext-str-strplural-n)

Type:

*   Static

Parameters:

*   str (`String`) — The string to translate
*   strPlural (`String`) — The plural form of the string
*   n (`Number`) — The quantity for which translation is needed

Returns:

*   (`String`) — The translated string

Translate `str` and choose plural form using the extension's gettext domain.

#### `ExtensionUtils.pgettext(context, str)` [​](#extensionutils-pgettext-context-str)

Type:

*   Static

Parameters:

*   context (`String`) — The context to disambiguate `str`
*   str (`String`) — The string to translate

Returns:

*   (`String`) — The translated string

Translate `str` in the context of `context` using the extension's gettext domain.

## Settings and Preferences [​](#settings-and-preferences)

TIP

See the development page for [Preferences](https://gjs.guide/extensions/development/preferences.html) for examples of how to use these utilities.

#### `ExtensionUtils.getSettings(schema)` [​](#extensionutils-getsettings-schema)

Type:

*   Static

Parameters:

*   schema (`String`) — The gettext domain to use

Returns:

*   (`Gio.Settings`) — A new \[`Gio.Settings`\]\[gsettings\] object for `schema`

Builds and returns a GSettings schema for `schema`, using schema files from the `schemas` subdirectory of the extension directory. If `schema` is omitted, it is taken from the [`settings-schema`](https://gjs.guide/extensions/overview/anatomy.html#settings-schema) field in the extension's [`metadata.json`](https://gjs.guide/extensions/overview/anatomy.html#metadata-json-required) file.

#### `ExtensionUtils.openPrefs()` [​](#extensionutils-openprefs)

Type:

*   Static

Open the preference dialog of the current extension.
