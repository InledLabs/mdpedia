---
title: Reglas de los Hooks – React
source: https://es.react.dev/reference/rules/rules-of-hooks
author: Unknown
excerpt: The library for web and native user interfaces
---

> 💡 **Tip**: Explore all indexed documents for **es.react.dev** in the [Domain Index](../../_index.md).

---

# Reglas de los Hooks – React

Los Hooks se definen mediante funciones JavaScript. Representan un tipo especial de lógica de UI reutilizable, con ciertas restricciones acerca de dónde pueden ser llamados.

**No llames a los Hooks dentro de bucles, condicionales, funciones anidadas o bloques `try`/`catch`/`finally`.** En su lugar, utilízalos siempre en el nivel más alto de tu función React, antes de cualquier retorno anticipado. Sólo puedes llamar a los Hooks mientras React esté renderizando un componente funcional:

No se admite llamar a los Hooks (funciones que empiezan con `use`) en casos como por ejemplo:

Si rompes estas reglas, es posible que veas este error.

```
function Bad({ cond }) {if (cond) {// 🔴 Mal: Hook llamado dentro de una condición (solución, muévelo afuera de la condición!)const theme = useContext(ThemeContext);}// ...}function Bad() {for (let i = 0; i < 10; i++) {// 🔴 Mal: Hook llamado dentro de un bucle (solución, muévelo afuera del bucle!)const theme = useContext(ThemeContext);}// ...}function Bad({ cond }) {if (cond) {return;}// 🔴 Mal: Hook llamado después de una condición de retorno (solución, muévelo antes del return!)const theme = useContext(ThemeContext);// ...}function Bad() {function handleClick() {// 🔴 Mal: Hook llamado dentro de una función event handler (solución, muévelo afuera de la función event handler!)const theme = useContext(ThemeContext);}// ...}function Bad() {const style = useMemo(() => {// 🔴 Mal: Hook llamado dentro de un useMemo (solución, muévelo afuera de la función useMemo!)const theme = useContext(ThemeContext);return createStyle(theme);});// ...}class Bad extends React.Component {render() {// 🔴 Mal: Hook llamado dentro de un componente de clase (solución, escribe un componente funcional en vez de un componente de clase!)useEffect(() => {})// ...}}function Bad() {try {// 🔴 Bad: Hook llamado dentro de un bloque try/catch/finally (solución, muévelo afuera del bloque!)const [x, setX] = useState(0);} catch {const [x, setX] = useState(1);}}
```

### Nota

Es _posible_ que los [Custom Hooks](https://es.react.dev/learn/reusing-logic-with-custom-hooks) llamen a otros Hooks (ése es su propósito). Esto funciona porque se supone que los custom Hooks sean también llamados, sólo mientras se renderiza un componente funcional.

No llames a los Hooks desde funciones convencionales de JavaScript. En su lugar, puedes:

✅ Llamar a los Hooks desde componentes funcionales de React. ✅ Llamar a los Hooks desde otros [custom Hooks](https://es.react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component).

Al seguir esta regla, nos aseguramos que toda la lógica del estado de un componente, sea claramente visible desde su código fuente.
