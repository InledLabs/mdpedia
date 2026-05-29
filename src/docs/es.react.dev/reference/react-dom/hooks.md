---
title: Hooks integrados de React DOM – React
source: https://es.react.dev/reference/react-dom/hooks
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# Hooks integrados de React DOM – React

El paquete de `react-dom` contiene Hooks que solo se admiten para aplicaciones web (que se ejecutan en el entorno DOM del navegador). Estos Hooks no son compatibles en entornos que no son de navegador, como en aplicaciones de iOS, Android o Windows. Si estás buscando Hooks que sean compatibles en navegadores web _y otros entornos_, consulta [la página de Hooks de React](https://es.react.dev/reference/react). Esta página enumera todos los Hooks en el paquete `react-dom`.

* * *

## Hooks de Formularios[](#form-hooks "Link for Hooks de Formularios ")

Los formularios (_forms_) te permiten crear controles interactivos para enviar información. Para manejar formularios en tus componentes, usa uno de estos Hooks:

*   [`useFormStatus`](https://es.react.dev/reference/react-dom/hooks/useFormStatus) facilita la actualización de la interfaz de usuario basada en el estado del formulario.

```
function Form({ action }) {async function increment(n) {return n + 1;}const [count, incrementFormAction] = useActionState(increment, 0);return (<form action={action}><button formAction={incrementFormAction}>Count: {count}</button><Button /></form>);}function Button() {const { pending } = useFormStatus();return (<button disabled={pending} type="submit">      Submit</button>);}
```
