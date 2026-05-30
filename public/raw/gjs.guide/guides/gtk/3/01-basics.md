---
title: "The Basics of GTK | GNOME JavaScript"
source: https://gjs.guide/guides/gtk/3/01-basics.html
requester: jaimegh-es
author: Unknown
excerpt: A Guide To GNOME JavaScript!
---

> 💡 **Tip**: Explore all indexed documents for **gjs.guide** in the [Domain Index](/doc/gjs.guide/_index).

---

# The Basics of GTK | GNOME JavaScript

## The Basics of GTK [​](#the-basics-of-gtk)

*   [What is GTK?](#what-is-gtk)
*   [What is a GUI toolkit?](#what-is-a-gui-toolkit)
*   [What is a widget?](#what-is-a-widget)
*   [Event-Driven](#event-driven)

This page serves as a general guide to GTK concepts and how they are implemented in GJS.

## What is GTK? [​](#what-is-gtk)

GTK is a powerful, event-driven GUI toolkit comprised of numerous widgets and utilities. Let's break that down!

## What is a GUI toolkit? [​](#what-is-a-gui-toolkit)

A GUI toolkit provides the libraries and tools for you, the developer, to build applications.

## What is a widget? [​](#what-is-a-widget)

A widget is a piece or part of your application which the user interacts with. Examples of widgets include buttons, labels, and images. Learn more about widgets [here](https://gjs.guide/guides/gtk/3/02-widgets.html);

## Event-Driven [​](#event-driven)

Like most GUI toolkits GTK adheres to the event-driven programming model. This means GTK "lies in wait" for any possible input from the user (keypresses, clicks, etc.) or computer. Without any input, GTK will do nothing. This "waiting" is called the _mainloop_ of the program.

---

> ⚖️ **Aviso Legal**: Este contenido ha sido indexado a petición del usuario de GitHub [@jaimegh-es](https://github.com/jaimegh-es). MDPEDIA es un servicio de indexación automática y no asume responsabilidad por el contenido solicitado por terceros. Para solicitudes de retirada (DMCA) o reclamaciones, contacta con hi@inled.es.
