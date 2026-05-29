---
title: Install Astro
source: https://docs.astro.build/en/install-and-setup/
author: Unknown
excerpt: How to install Astro and start a new project.
---

> 💡 **Tip**: Explore all indexed documents for **docs.astro.build** in the [Domain Index](../_index.md).

---

# Install Astro

The [`create astro` CLI command](#install-from-the-cli-wizard) is the fastest way to start a new Astro project from scratch. It will walk you through every step of setting up your new Astro project and allow you to choose from a few different official starter templates.

You can also run the CLI command with the `template` flag to begin your project using any existing theme or starter template. Explore our [themes and starters showcase](https://astro.build/themes/) where you can browse themes for blogs, portfolios, documentation sites, landing pages, and more!

To install Astro manually instead, see our [step-by-step manual installation guide](#manual-setup).

*   **Node.js** - `v22.12.0` or higher. Odd-numbered versions like `v23` are not supported.
*   **Text editor** - We recommend [VS Code](https://code.visualstudio.com/) with our [Official Astro extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode).
*   **Terminal** - Astro is accessed through its command-line interface (CLI).

## Browser compatibility

[Section titled “Browser compatibility”](#browser-compatibility)

Astro is built with Vite which targets browsers with modern JavaScript support by default. For a complete reference, you can see the [list of currently supported browser versions in Vite](https://vite.dev/guide/build.html#browser-compatibility).

## Install from the CLI wizard

[Section titled “Install from the CLI wizard”](#install-from-the-cli-wizard)

You can run `create astro` anywhere on your machine, so there’s no need to create a new empty directory for your project before you begin. If you don’t have an empty directory yet for your new project, the wizard will help create one for you automatically.

1.  Run the following command in your terminal to start the install wizard:
    
    *   [npm](#tab-panel-573)
    *   [pnpm](#tab-panel-574)
    *   [Yarn](#tab-panel-575)
    
    ```
    # create a new project with npmnpm create astro@latest
    ```
    
    If all goes well, you will see a success message followed by some recommended next steps.
    
2.  Now that your project has been created, you can `cd` into your new project directory to begin using Astro.
    
3.  If you skipped the “Install dependencies?” step during the CLI wizard, then be sure to install your dependencies before continuing.
    
    *   [npm](#tab-panel-576)
    *   [pnpm](#tab-panel-577)
    *   [Yarn](#tab-panel-578)
    
    ```
    npm install
    ```
    
4.  You can now [start the Astro dev server](https://docs.astro.build/en/develop-and-build/#start-the-astro-dev-server) and see a live preview of your project while you build!
    

## CLI installation flags

[Section titled “CLI installation flags”](#cli-installation-flags)

You can run the `create astro` command with additional flags to customize the setup process (e.g. answering “yes” to all questions, skipping the Houston animation) or your new project (e.g. install git or not, add integrations).

You can start a new Astro project and install any [official integrations](https://docs.astro.build/en/guides/integrations/) or community integrations that support the `astro add` command at the same time by passing the `--add` argument to the `create astro` command.

Run the following command in your terminal, substituting any integration that supports the `astro add` command:

*   [npm](#tab-panel-579)
*   [pnpm](#tab-panel-580)
*   [Yarn](#tab-panel-581)

```
# create a new project with React and Partytownnpm create astro@latest -- --add react --add partytown
```

### Use a theme or starter template

[Section titled “Use a theme or starter template”](#use-a-theme-or-starter-template)

You can start a new Astro project based on an [official example](https://github.com/withastro/astro/tree/main/examples) or the `main` branch of any GitHub repository by passing a `--template` argument to the `create astro` command.

Run the following command in your terminal, substituting the official Astro starter template name, or the GitHub username and repository of the theme you want to use:

*   [npm](#tab-panel-582)
*   [pnpm](#tab-panel-583)
*   [Yarn](#tab-panel-584)

```
# create a new project with an official examplenpm create astro@latest -- --template <example-name># create a new project based on a GitHub repository’s main branchnpm create astro@latest -- --template <github-username>/<github-repo>
```

By default, this command will use the template repository’s `main` branch. To use a different branch name, pass it as part of the `--template` argument: `<github-username>/<github-repo>#<branch>`.

This guide will walk you through the steps to manually install and configure a new Astro project.

If you prefer not to use our automatic `create astro` CLI tool, you can set up your project yourself by following the guide below.

1.  Create your directory
    
    Create an empty directory with the name of your project, and then navigate into it.
    
    ```
    mkdir my-astro-projectcd my-astro-project
    ```
    
    Once you are in your new directory, create your project `package.json` file. This is how you will manage your project dependencies, including Astro. If you aren’t familiar with this file format, run the following command to create one.
    
    *   [npm](#tab-panel-585)
    *   [pnpm](#tab-panel-586)
    *   [Yarn](#tab-panel-587)
    
    ```
    npm init --yes
    ```
    
2.  Install Astro
    
    First, install the Astro project dependencies inside your project.
    
    *   [npm](#tab-panel-588)
    *   [pnpm](#tab-panel-589)
    *   [Yarn](#tab-panel-590)
    
    ```
    npm install astro
    ```
    
    Then, replace any placeholder “scripts” section of your `package.json` with the following:
    
    ```
    {  "scripts": {    "test": "echo \"Error: no test specified\" && exit 1",    "dev": "astro dev",    "build": "astro build",    "preview": "astro preview"  },}
    ```
    
    You’ll use these scripts later in the guide to start Astro and run its different commands.
    
3.  Create your first page
    
    In your text editor, create a new file in your directory at `src/pages/index.astro`. This will be your first Astro page in the project.
    
    For this guide, copy and paste the following code snippet (including `---` dashes) into your new file:
    
    ```
    ---// Welcome to Astro! Everything between these triple-dash code fences// is your "component frontmatter". It never runs in the browser.console.log('This runs in your terminal, not the browser!');---<!-- Below is your "component template." It's just HTML, but with    some magic sprinkled in to help you build great templates. --><html>  <body>    <h1>Hello, World!</h1>  </body></html><style>  h1 {    color: orange;  }</style>
    ```
    
4.  Create your first static asset
    
    You will also want to create a `public/` directory to store your static assets. Astro will always include these assets in your final build, so you can safely reference them from inside your component templates.
    
    In your text editor, create a new file in your directory at `public/robots.txt`. `robots.txt` is a simple file that most sites will include to tell search bots like Google how to treat your site.
    
    For this guide, copy and paste the following code snippet into your new file:
    
    ```
    # Example: Allow all bots to scan and index your site.# Full syntax: https://developers.google.com/search/docs/advanced/robots/create-robots-txtUser-agent: *Allow: /
    ```
    
5.  Create `astro.config.mjs`
    
    Astro is configured using `astro.config.mjs`. This file is optional if you do not need to configure Astro, but you may wish to create it now.
    
    Create `astro.config.mjs` at the root of your project, and copy the code below into it:
    
    ```
    import { defineConfig } from "astro/config";// https://astro.build/configexport default defineConfig({});
    ```
    
    If you want to include [UI framework components](https://docs.astro.build/en/guides/framework-components/) such as React, Svelte, etc. or use other tools such as MDX or Partytown in your project, here is where you will [manually import and configure integrations](https://docs.astro.build/en/guides/integrations/).
    
6.  Add TypeScript support
    
    TypeScript is configured using `tsconfig.json`. Even if you don’t write TypeScript code, this file is important so that tools like Astro and VS Code know how to understand your project. Some features (like npm package imports) aren’t fully supported in the editor without a `tsconfig.json` file.
    
    If you do intend to write TypeScript code, using Astro’s `strict` or `strictest` template is recommended. You can view and compare the three template configurations at [astro/tsconfigs/](https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/).
    
    Create `tsconfig.json` at the root of your project, and copy the code below into it. (You can use `base`, `strict`, or `strictest` for your TypeScript template):
    
    ```
    {  "extends": "astro/tsconfigs/base"}
    ```
    
7.  Next Steps
    
    If you have followed the steps above, your project directory should now look like this:
    
    *   Directorynode\_modules/
        
        *   …
        
    *   Directorypublic/
        
        *   robots.txt
        
    *   Directorysrc/
        
        *   Directorypages/
            
            *   index.astro
            
        
    *   astro.config.mjs
    *   package-lock.json
    *   package.json
    *   tsconfig.json
    
8.  You can now [start the Astro dev server](https://docs.astro.build/en/develop-and-build/#start-the-astro-dev-server) and see a live preview of your project while you build!
    

[Contribute](https://docs.astro.build/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)
