# OOHTML — _HTML for the Modern UI_

[![npm version][npm-version-src]][npm-version-href]<!--[![npm downloads][npm-downloads-src]][npm-downloads-href]-->
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]

HTML lacks the component system, reactivity, and other paradigms that underpin modern UI development. OOHTML brings these capabilities to HTML and makes it possible to directly author user interfaces in HTML.

OOHTML is _Object-Oriented HTML_. It is a semantic layer over standard HTML that adds new behaviours to the DOM — including reactivity and a declarative component system.

It comes as a script that plugs diretly into the DOM and have new semantics take effect. No compile step or setup is required. And that makes it especially convenient to work with.

```html
<script src="https://unpkg.com/@webqit/oohtml/dist/main.lite.js"></script>
```

## Capabilities

### `1 | ` A component system

OOHTML enables a simple "define-and-use" system in HTML that is based on two complementary elements — the `<template>` and `<import>` elements. It makes it really easy to share repeating structures and stay organized.

### `2 | ` Data-binding and reactivity

OOHTML gives HTML the concept of data-binding (`{ expression }`) and reactivity that lets you embed application data in markup and have them stay in sync with application state. You get framework-grade reactivity without the overhead.

### `3 | ` New scoping behaviours

OOHTML extends the existing CSS scoping system to support the familiar `<style scoped>` syntax, introduces scoping for scripts (`<script scoped>`), and solves namespacing for IDs (`namespace`). They form a complete scoping system that is both declarative and powerful.

## Overview

All of the above can be seen in a three-step tour. Each sample document below can be previewed directly in the browser:

### `1 | ` Write HTML as Reusable Components

At its core, OOHTML is a component system. It lets you write HTML as reusable components.

The standard `<template>` element already lets you define reusable markup. OOHTML completes the idea by introducing the `<import>` element.

You write the following:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/@webqit/oohtml/dist/main.lite.js"></script>

    <!-- A reusable component -->
    <template def="card">
      <article>
        <h2>Static title</h2>
        <p>Static body text.</p>
      </article>
    </template>
  </head>

  <body>
    <!-- The import -->
    <import ref="card"></import>
  </body>
</html>
```

It resolves to the following, at runtime:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/@webqit/oohtml/dist/main.lite.js"></script>

    <!-- The reusable component -->
    <template def="card">
      <article>
        <h2>Static title</h2>
        <p>Static body text.</p>
      </article>
    </template>
  </head>

  <body>
    <!-- The resolved import -->
    <article>
      <h2>Static title</h2>
      <p>Static body text.</p>
    </article>
  </body>
</html>
```

#### Up there…

- `<template def>` — called a HTML module – defines the reusable markup.
- `<import ref>` — called an import – instantiates that module in its place.
- The relationship between `<template>` and `<import>` continues **live** such that changes in `<template>` or `<import>` either dissolve or re-resolve the import.

> [!NOTE]
> Later we'll cover the various usage patterns supported by the `<template>` and `<import>` system. We will also introduce file-based components and remote imports.

### `2 | ` Do Data-Binding with Standard HTML Comments

As a complete component system, OOHTML extends the DOM to support data-binding and reactivity.

OOHTML follows the conventional syntax for data-binding — `{ expression }` — but has that written inside HTML comments: `<?{ expression }?>` or `<!--?{ expression }?-->`. These start life as normal HTML comments but render application data at runtime.

You write the following:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/@webqit/oohtml/dist/main.lite.js"></script>
  </head>

  <body>
    <h1><?{ title }?></h1>
    <p><!--?{ content }?--></p>
    <p>Count: <?{ count }?></p>

    <script>
      document.bind({
        title: "Hello OOHTML",
        content: "Pure HTML, now reactive.",
        count: 0,
      });

      setInterval(() => {
        document.bindings.count++;
      }, 1000);
    </script>
  </body>
</html>
```

It resolves to the following, at runtime:

```html
<!DOCTYPE html>
<html>
  <head>
    …
  </head>
  <body>
    <h1>Hello OOHTML</h1>
    <p>Pure HTML, now reactive.</p>
    <p>Count: 0</p>
    <!-- increments live -->

    <script>
      document.bind({
        title: "Hello OOHTML",
        content: "Pure HTML, now reactive.",
        count: 0,
      });

      setInterval(() => {
        document.bindings.count++;
      }, 1000);
    </script>
  </body>
</html>
```

#### Up there…

- `<?{ expression }?>` and `<!--?{ expression }?-->` function as comments but embed reactive expressions.
    - Both styles – `<? ?>` and `<!-- -->` – are valid HTML comments and are interchangeable.
- `document.bind({ ... })` binds data to the DOM – at the document level.
    - The data converges to `document.bindings` – a reactive data interface.
- Embedded expressions resolve from the bound data and stay in sync with it. Changes to data are automatically reflected in the UI.

> [!NOTE]
> Later we'll cover OOHTML's attribute-based binding syntax. We'll also formally introduce Mutation-Based Reactivity – the form of reactivity that OOHTML is based on.

### `3 | ` More Typical Usage Patterns

From the component and data-binding systems above to the scoping system yet to be discussed – OOHTML's features compose nicely into various usage patterns.

The document below brings some of that to life.

You write:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/@webqit/oohtml/dist/main.lite.js"></script>

    <template def="card">
      <!-- Component with scoped IDs -->
      <article namespace>
        <h2 id="title"><?{ localTitle }?> – <?{ globalTitle }?></h2>
        <p id="body"><?{ body }?></p>
        <p>Local count: <?{ count }?></p>

        <!-- Scoped styles -->
        <style scoped>
          :scope {
            border: 1px solid #ddd;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          #title {
            color: teal;
          }
          #body {
            opacity: 0.85;
          }
        </style>

        <!-- Scoped scripts -->
        <script scoped>
          this.bind({
            localTitle: "Card Title",
            body: "Rendered inside the component.",
            count: 0,
          });

          setInterval(() => this.bindings.count++, 1000);
        </script>
      </article>
    </template>
  </head>

  <body>
    <h2 id="title"><?{ globalTitle }?></h2>
    <p id="body"><?{ body }?></p>
    <p>Global count: <?{ count }?></p>

    <!-- Import the component -->
    <import ref="card"></import>

    <!-- Import the component again -->
    <import ref="card"></import>

    <p class="footer">Footer: <?{ footerNote }?></p>

    <script>
      document.bind({
        globalTitle: "Card Demo",
        body: "Rendered outside the component.",
        footerNote: "Rendered outside the component.",
        count: 0,
      });

      setInterval(() => document.bindings.count++, 2000);
    </script>
  </body>
</html>
```

It resolves to the following, at runtime:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- existing contents -->
  </head>
  <body>
    <h2 id="title">Card Demo</h2>
    <p id="body">Rendered outside the component.</p>
    <p>Global count: 0</p>

    <article namespace>
      <h2 id="title">Card Title – Card Demo</h2>
      <p id="body">Rendered inside the component.</p>
      <p>Local count: 0</p>
      <style scoped>
        /* existing contents */
      </style>
      <script scoped>
        /* existing contents */
      </script>
    </article>

    <article namespace>
      <h2 id="title">Card Title – Card Demo</h2>
      <p id="body">Rendered inside the component.</p>
      <p>Local count: 0</p>
      <style scoped>
        /* existing contents */
      </style>
      <script scoped>
        /* existing contents */
      </script>
    </article>

    <p class="footer">Footer: Rendered outside the component.</p>

    <script>
      /* existing contents */
    </script>
  </body>
</html>
```

#### Up there…

- We have a single component imported twice.
- Style, script, and IDs scoped to the component so that repeating the structure in the DOM don't create collisions.
- Bindings resolve seamlessly inside and outside the component.
- The template ↔ import relationship hold live as before.
    - Such that if you located the original `<template def> → <article>` element in the browser's console and deleted the node, all imports would dissolve; restored, all imports would resolve.
- Similarly, the namespace ↔ ID relationship, and the data ↔ binding relationship, all hold live.

## HTML for the Modern UI

By simply enhancing HTML, OOHTML makes it possible to directly author modern user interfaces in HTML and effectively removes the tooling tax traditionally associated with UI development. In place of a compile step, you get a back-to-the-basics experience and an edit-in-the-browser workflow.

> [!TIP]
> In addition to inline components, OOHTML also supports file-based components. It's companion CLI tool – [OOHTML CLI](https://github.com/webqit/oohtml-cli) – lets you define your components in files and have them come together into a single file that you can directly import into your page.

> [!TIP]
> OOHTML solves the UI side of your application. You would need a framework to build a complete app with OOHTML. [Webflo](https://github.com/webqit/webflo) is a modern fullstack framework that converges on OOHTML for the UI. You even get Hot Module Replacement (HMR) on top as you edit your HTML components.

## Not a Replacement for Shadow DOM

OOHTML comes as its own addition to the DOM – alongside Web Components and Shadow DOM. Far from an Anti-Shadow DOM effort, OOHTML complements the HTML authoring experience inside the Shadow DOM itself – as it does outside of it. When used in the Shadow DOM, the Shadow DOM simply becomes the document that OOHTML sees – the Shadow Root itself (`#shadow-root`) being the new `document` root that OOHTML works with.

Leveraging OOHTML in the Shadow DOM requires no additional step. Simply have the OOHTML script loaded in the main document as before and write.

For a quick way to see OOHTML in the Shadow DOM, we could suppose the whole of [example 3](#3---more-typical-usage-patterns) above as the Shadow DOM of a certain Web Component. It would look like this:

<details><summary>Web Component + Shadow DOM + OOHTML – (Click to show)</summary>

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/@webqit/oohtml/dist/main.lite.js"></script>
    <script type>
        customElements.define('demo-component', class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            
            connectedCallback() {
                // Shadow DOM markup
                this.shadowRoot.innerHTML = `
                <template def="card" scoped>
                <!-- Reusable markup -->
                <article namespace>
                    <h2 id="title"><?{ localTitle }?> – <?{ globalTitle }?></h2>
                    <p id="body"><?{ body }?></p>
                    <p>Local count: <?{ count }?></p>

                    <style scoped>
                    :scope {
                        border: 1px solid #ddd;
                        padding: 1rem;
                        margin-bottom: 1rem;
                    }
                    #title {
                        color: teal;
                    }
                    #body {
                        opacity: 0.85;
                    }
                    </style>

                    <scr` + `ipt scoped>
                    this.bind({
                        localTitle: "Card Title",
                        body: "Rendered inside the component.",
                        count: 0,
                    });

                    setInterval(() => this.bindings.count++, 1000);
                    </scr` + `ipt>
                </article>
                </template>

                <h2 id="title"><?{ globalTitle }?></h2>
                <p id="body"><?{ body }?></p>
                <p>Global count: <?{ count }?></p>

                <import ref="card">1</import>
                <!-- Import 1 -->

                <import ref="card">2</import>
                <!-- Import 2 -->

                <p class="footer">Footer: <?{ footerNote }?></p>

                <scri` + `pt>
                this.shadowRoot.bind({
                    globalTitle: "Card Demo",
                    body: "Rendered outside the component.",
                    footerNote: "Rendered outside the component.",
                    count: 0,
                });

                setInterval(() => this.shadowRoot.bindings.count++, 2000);
                </scri` + `pt>`;
            }
        });
    </script>
  </head>

  <body>
    <demo-component></demo-component>
  </body>
</html>
```

> [!IMPORTANT]
> The example above follows the pattern that OOHTML currently supports: injecting the shadow DOM markup in the `connectedCallback()` phase. Doing so in the constructor currently doesn't work. Declarative Shadow DOM is also not supported yet. We hope to overcome this limitation in future versions.

</details>

## Documentation

OOHTML adds a coherent set of capabilities to HTML: a declarative component system, data-binding and reactivity, scoped styles and scripts, namespaces for IDs, and the underlying context model that ties them together.

This README introduces the ideas.
The full reference each lives in the Wiki.

| Capability                  | Description                                                                                                                                       | Reference                                                                                |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------- |
| **HTML Imports**            | Declarative & imperative module imports (`<template def>` · `<import ref>`) including remote modules, inheritance, contexts, and live resolution. | [HTML Imports](https://github.com/webqit/oohtml/wiki/HTML-Imports)                       |
| **Data Binding**            | Comment-based bindings (`<?{ }?>`), attribute-based bindings (`render="…”`), list rendering, and runtime updates.                                 | [Data Binding](https://github.com/webqit/oohtml/wiki/Data-Binding)                       |
| **DOM Scoping**             | Style and script scoping (`<style scoped>`, `<script scoped>`) Namespaces for IDs.                                                                | [DOM Scoping](https://github.com/webqit/oohtml/wiki/DOM-Scoping)                         |
| **Bindings API**            | Reactive state surfaces on any DOM node (`node.bindings`, `node.bind()`), powering all binding resolution.                                        | [Bindings API](https://github.com/webqit/oohtml/wiki/Bindings-API)                       |
| **Context API**             | The request/response infrastructure that powers imports, bindings, namespacing, and scoping resolution.                                           | [Context API](https://github.com/webqit/oohtml/wiki/Context-API)                         |
| **Live Scripts**            | Fine-grained reactivity embedded directly in JavaScript using the Quantum runtime.                                                                | [Live Scripts](https://github.com/webqit/oohtml/wiki/Live-Scripts)                       |
| **SSR Model**               | Server-rendering rules, import hydration, and binding preservation.                                                                               | [SSR](https://github.com/webqit/oohtml/wiki/SSR)                                         |
| **Advanced Topics**         | Imports contexts, module inheritance, execution timing, Web Component integration, and more.                                                      | [Advanced Topics](https://github.com/webqit/oohtml/wiki/Advanced-Topics)                 |

> Many of these pages coming soon.

## Installation

OOHTML can be used in two ways:

- Directly in the browser, via a client-side script
- Via npm – for integration with bundlers, jsdom, SSR, etc.

### 1. Browser Setup

This is the simplest way to use OOHTML in a normal web page.

```html
<script src="https://unpkg.com/@webqit/oohtml/dist/main.lite.js"></script>
```

#### Placement

Put this script early in the document.
It must be a classic script — without an `async` or `defer` attribute — so the script can load as a blocking script.

> [!IMPORTANT]
> Early placement in the document and loading as a blocking script helps ensure that OOHTML is present in the document's parsing phase.
OOHTML needs to be present **while** the document is parsed so it can activate the needed behavior on the relevant elements.

#### Build Options

OOHTML ships with two builds:

* **`main.lite.js`** – the *lite* edition; the default and recommended. Provides async execution for scoped scripts and "live" scripts.
* **`main.js`** – the *full* edition; needed when you require synchronous script timing for scoped scripts and "live" scripts.

### 2. Via npm

For integrating with bundlers, testing, or server-side operations, install OOHTML and its `@webqit/use-live` dependency:

```bash
npm i @webqit/oohtml @webqit/use-live
```

Then bootstrap OOHTML on the target DOM instance:

```js
import * as UseLive from '@webqit/use-live/lite';
import init from '@webqit/oohtml/src/init.js';

init.call(window, UseLive/*, options */);
```

#### SSR with jsdom

For pure server-side operations and SSR, install `jsdom` and use its `window` object as OOHTML's `window` option:

```js
import { JSDOM } from "jsdom";
import * as UseLive from '@webqit/use-live/lite';
import init from '@webqit/oohtml/src/init.js';

const dom = new JSDOM(`<html><body></body></html>`);
init.call(dom.window, UseLive/*, options */);
```

#### SSR with `OOHTML-SSR`

For the best SSR setup, see [OOHTML SSR](https://github.com/webqit/oohtml-ssr).

## Getting Involved

All forms of contributions are welcome at this time. For example, syntax and other implementation details are all up for discussion. Also, help is needed with more formal documentation. And here are specific links:

+ [Project](https://github.com/webqit/oohtml)
+ [Documentation](https://github.com/webqit/oohtml/wiki)
+ [Discusions](https://github.com/webqit/oohtml/discussions)
+ [Issues](https://github.com/webqit/oohtml/issues)

## License

MIT.

[npm-version-src]: https://img.shields.io/npm/v/@webqit/oohtml?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/@webqit/oohtml
[npm-downloads-src]: https://img.shields.io/npm/dm/@webqit/oohtml?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@webqit/oohtml
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@webqit/oohtml?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=@webqit/oohtml
[license-src]: https://img.shields.io/github/license/webqit/oohtml.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/webqit/oohtml/blob/master/LICENSE
