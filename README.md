# OOHTML

<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/@webqit/oohtml" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@webqit/oohtml.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@webqit/oohtml" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@webqit/oohtml.svg" alt="NPM downloads" /></a></span>

<!-- /BADGES -->

[Object-Oriented HTML (OOHTML)](https://github.com/webqit/oohtml) is a suite of new DOM features that particularly facilitates writing modular HTML, CSS, and JavaScript *natively* and *more conveniently*. It addresses a number of limitions inherent to existing conventions, and welcomes much of the paradigms associated with modern UI development.

> OOHTML is being proposed as a [W3C standard at the Web Platform Incubator Community Group](https://discourse.wicg.io/t/proposal-chtml/4716) based on [this explainer](https://github.com/webqit/docs/tree/master/oohtml/explainer). Consider bringing your ideas to the discussion.

> [Visit project docs](https://github.com/webqit/docs/tree/master/oohtml).

## Features
OOHTML proposes five new features to native web languages to make common UI design terminologies possible natively. These features may be used individually or together to improve how we author UI code.

+ [HTML Modules](https://github.com/webqit/docs/tree/master/oohtml#html-modules)
+ [HTML Imports](https://github.com/webqit/docs/tree/master/oohtml#html-imports)
+ [The State API](https://github.com/webqit/docs/tree/master/oohtml#the-state-api)
+ [Reflex Scripts](https://github.com/webqit/docs/tree/master/oohtml#reflex-scripts)
+ [Namespaced HTML](https://github.com/webqit/docs/tree/master/oohtml#namespaced-html)

Everthing about OOHTML is currently available through a [polyfill](https://github.com/webqit/docs/tree/master/oohtml/polyfill). Be sure to check polyfill support in each feature.

### HTML Modules
HTML Modules is a new DOM feature that lets us work with `<template>` elements and their contents using the *modules*, *imports* and *exports* paradigm. It introduces a clear naming convention for easy access to these elements and for organizing them *meaningfully* in a document.

Modules are designated using the `name` attribute, and their contents are regarded as *exports*.

```html
<head>

    <template name="module1">

        <label for="age">How old are you?</div>
        <input id="age" />

    </template>

</head>
```

Exports may be more properly wrapped within an `<export>` element of a designated name.

```html
<head>

    <template name="module1">

        <export name="question">
            <label for="age">How old are you?</label>
            <input id="age" />
        </export>

        <div>This is another export</div>

    </template>

</head>
```

Or they may be individually *tagged* to an export identifier using the `exportgroup` attribute.

```html
<head>

    <template name="module1">

        <label exportgroup="question" for="age">How old are you?</label>
        <input exportgroup="question" name="age" />
        
        <div>This is another export</div>

    </template>

</head>
```

Either way, they will be accessed the same way using the *Modules API*.

```js
// Access module1 from document.templates
let module1 = document.templates.module1;

// Import module1's exports
let questionExport = module1.exports.question; // Array

// Clone the elements in the export
let questionExportClone = questionExport.map(el => el.cloneNode(true));
```

Taking things further, template elements may reference remote content using the `src` attribute.

```html
<head>

    <template name="module-remote" src="/bundle.html"></template>

</head>
```

The contents of the remote file automatically becomes the template's content on load.

*Details are in the [HTML Modules](https://github.com/webqit/docs/tree/master/oohtml/html-modules) section. Learn more about the convention, API, events, and the polyfill support.*

### HTML Imports
HTML Imports are a declarative way to place reusable snippets from HTML Modules just where they are needed across the DOM.

Using the HTML Modules defined in the above section, an `<import>` element in the `<body>` area could simply point to a module and *place* its exports.

```html
<body>

    <!-- Import question from module1 here -->
    <import name="question" template="module1"></import>

</body>
```

Resolution takes place and the `<import>` element is replaced by all of the imported contents.

```html
<body>

    <!-- import element replaced -->
    <label for="age">How old are you?</label>
    <input id="age" />

</body>
```

One or more `<import>` elements could use a *module ID* defined at a higher scope in the tree.

```html
<body>

    <!-- Point to a module -->
    <div template="module1">

        <!-- Import question here -->
        <import name="question"></import>

        <div>
            <!-- Import another export here -->
            <import name="export-2"></import>
        </div>

    </div>

</body>
```

*Imports* are resolved again when the module ID is dynamically pointed at another `<template>`.

```js
document.querySelector('div[template="module1"]').setAttribute('template', 'module2');
```

This opens up new simple ways to create very dynamic applications. [Think a Single Page Application](https://github.com/webqit/docs/tree/master/oohtml/examples/spa) (SPA).

*Details are in the [HTML Imports](https://github.com/webqit/docs/tree/master/oohtml/html-imports) section. Learn more about the convention, dynamicity, Slot Inheritance, isomorphic rendering, and the polyfill support.*

### The State API
The State API is a DOM feature that lets us maintain application state at both the document level and the individual element levels. It makes it easy to think about application state at different levels in the DOM tree and to keep track of changes at each level.

This API exposes a `.state` property on the document object and on elements. Arbitrary values can be set and read here the same way we work with regular objects.

```js
// At the document level
document.state.pageTitle = 'Hello World!';
console.log(document.state.pageTitle); // Hello World!

// At the element level
element.state.collapsed = true;
console.log(element.state.collapsed); // true
```

*State Objects* are *live objects* that can be observed for changes using the [Observer API](https://github.com/webqit/docs/tree/master/oohtml/the-observer-api).

```js
Observer.observe(document.state, 'pageTitle', e => {
    console.log('New Page Title: ' + e.value);
    // Or we could reflect this state on the document title element
    document.querySelector('title').innerHTML = e.value;
});
```

This lets us build very reactive applications natively.

Using an element's state API, we could make a practical *collapsible* component.

```js
customElements.define('my-collapsible', class extends HTMLElement {

    /**
     * Creates the Shadow DOM
     */
    constructor() {
        super();
        // Observe state and get the UI synced
        let contentElement = this.querySelector('.content');
        Observer.observe(this.state, 'collapsed', e => {
            contentElement.style.height = e.value ? '0px' : 'auto';
            this.setAttribute('data-collapsed', e.value ? 'true' : 'false');
        });

        // Implement the logic for toggling collapsion
        let controlElement = this.querySelector('.control');
        controlElement.addEventListener('click', function() {
            this.state.collapsed = !this.state.collapsed;
        });
    }

});
```

```html
<my-collapsible>
    <div class="control">Toggle Me</div>
    <div class="content" style="height: 0px">
        Some content
    </div>
</my-collapsible>
```

And other parts of the application can be in sync with its state.

```js
let collapsible = document.querySelector('my-collapsible');
Observer.observe(collapsible.state, 'collapsed', e => {
    console.log(e.value ? 'element collapsed' : 'element expanded');
});
```

*Details are in the [State API](https://github.com/webqit/docs/tree/master/oohtml/the-state-api) section. Learn more about the API, deep observability, and the polyfill support.*

### Reflex Scripts
Reflex scripts are a new type of `<script>` elements that works as a *data binding* language for the UI. They are *scoped* to their immediate host elements instead of the global browser scope. These important features make Reflex scripts an exciting way to apply behaviour to modular markup, giving us the ability to have some logic without some JavaScript file.

The following `<script>` element is scoped to the `#alert` element - its host element:

```html
<div id="alert">

    <div class="message"></div>
    <div class="exit" title="Close this message.">X</div>

    <script type="reflex">
        this.querySelector('.exit').addEventListener('click', () => {
            this.remove();
        });
    </script>

</div>
```

And we can render values from the global scope or from the element itself.

```html
<body>

    <div id="alert">

        <div class="message"></div>
        <div class="exit" title="Close this message.">X</div>

        <script type="reflex">
            // Render the "message" property from the element's state object
            this.querySelector('.message').innerHTML = this.state.message;
            this.querySelector('.exit').addEventListener('click', () => {
                this.remove();
            });
        </script>

    </div>

<body>
```

Then the reactive part! Reflex scripts are always in sync with any observable properties that may be referenced in their statements. Statements are re-executed whenever the observable properties they depend on change. Thus, in the code above, changes to the observable property `.state.message` will trigger that specific statement to run again.

```js
let alertElement = document.querySelector('#alert');
alertElement.state.message = 'Task started!';
setTimeout(() => {
    alertElement.state.message = 'Task complete!';
}, 1000);
```

The `<my-collapsible>` component we created in the section above could as well be implemented with Reflex this way.

```html
<div id="collapsible">
    
    <div class="control">Toggle Me</div>
    <div class="content" style="height: 0px">
        Some content
    </div>

    <script type="reflex">
        // Observe state and get the UI synced
        let contentElement = this.querySelector('.content');
        // Without requiring Observer.observe() here...
        contentElement.style.height = this.state.collapsed ? '0px' : 'auto';
        this.setAttribute('data-collapsed', this.state.collapsed ? 'true' : 'false');

        // Implement the logic for toggling collapsion
        let controlElement = this.querySelector('.control');
        controlElement.addEventListener('click', function() {
            this.state.collapsed = !this.state.collapsed;
        });
    </script>

</div>
```

> Sometimes, we do not even need as much as a custom element to bring life to some spot in the UI.

*Details are in the [Reflex Scripts](https://github.com/webqit/docs/tree/master/oohtml/reflex-scripts) section. Learn more about Reflex Actions, deep observability, bindings, the API, error handling, and the polyfill support.*

### Namespaced HTML
Namespacing is a DOM feature that let's an element establish its own naming context for descendant elements. It makes it possible to keep IDs scoped to a context other than the document's global scope.

The following modular markup implements its IDs in namespaces:

```html
<article id="continents" namespace>
    <section id="europe" namespace>
        <div id="about">About Europe</b></div>
        <div id="countries">Countries in Europe</div>
    </section>
    <section id="asia" namespace>
        <div id="about">About Asia</b></div>
        <div id="countries">Countries in Asia</div>
    </section>
</article>
```

The above gives us a conceptual hierarchy of objects:

```html
continents
|- europe
|   |- about
|   |- countries
|- asia
    |- about
    |- countries
```

The *namespace API* translates that model into a real object tree:

```js
// Get the "continents" article
let continents = document.namespace.continents;

// Access scoped IDs with the new "namespace" DOM property
let europe = continents.namespace.europe;
let asia = continents.namespace.asia;

// And for deeply-nested IDs...
let aboutAsia = continents.namespace.asia.namespace.about;
```

We get a document structure that's easier to reason about and to work with.

One advantage of the Namespace API is that it minimizes selector-based queries. Much of our code in the examples above could go without the `.querySelector()` function. For example, below is a *namespaced* version of the *my-collapsible* element we created in the section for [The State API](https://github.com/webqit/docs/tree/master/oohtml/the-state-api) above.

```html
<my-collapsible namespace>
    <div id="control">Toggle Me</div>
    <div id="content" style="height: 0px">
        Some content
    </div>
</my-collapsible>
```

```js
customElements.define('my-collapsible', class extends HTMLElement {

    /**
     * Creates the Shadow DOM
     */
    constructor() {
        super();
        // Observe state and get the UI synced
        let contentElement = this.namespace.content;
        Observer.observe(this.state, 'collapsed', e => {
            contentElement.style.height = e.value ? '0px' : 'auto';
            this.setAttribute('data-collapsed', e.value ? 'true' : 'false');
        });

        // Implement the logic for toggling collapsion
        let controlElement = this.namespace.control;
        controlElement.addEventListener('click', function() {
            this.state.collapsed = !this.state.collapsed;
        });
    }

});
```

And below is a *namespaced* version of the Reflex-based *collapsible* element we created in the section for [Reflex Scripts](https://github.com/webqit/docs/tree/master/oohtml/reflex-scripts) above.

```html
<div id="collapsible" namespace>
    
    <div id="control">Toggle Me</div>
    <div id="content" style="height: 0px">
        Some content
    </div>

    <script type="reflex">
        this.namespace.content.style.height = this.state.collapsed ? '0px' : 'auto';
        this.setAttribute('data-collapsed', this.state.collapsed ? 'true' : 'false');
        this.namespace.control.addEventListener('click', function() {
            this.state.collapsed = !this.state.collapsed;
        });
    </script>

</div>
```

*Details are in the [Namespaced HTML](https://github.com/webqit/docs/tree/master/oohtml/namespaced-html) section. Learn more about the convention, Namespaced Selectors, API, observability, and the polyfill support.*

## Design Goals
See the [features explainer](https://github.com/webqit/docs/tree/master/oohtml/explainer).

## Supporting OOHTML
*Platform feature* proposals aren't the easiest thing in the world!

+ They have to be something everyone can agree on!

    If you indeed have a usecase for all, or aspects, of OOHTML, or have some opinions, you should please join the discussion at the [WICG](https://discourse.wicg.io/t/proposal-chtml/4716).
    
    If you are building something early with it (just as we are building [webqit.io](https://webqit.io) with it), we'd like to hear from you via any means - [WICG](https://discourse.wicg.io/t/proposal-chtml/4716), [email](oxharris.dev@gmail.com), [issue](https://github.com/webqit/oohtml/issues). And Pull Requests are very welcomed!
+ They have to go through a million iterations! And much in dollars go into that!

    If you could help in some way, we'd be more than glad! If you'd like to find out how to, or whether as much as $1 counts, or if there are perks for supporting, you should indeed reach out [here](oxharris.dev@gmail.com).

## FAQs
We are working on publishing some questions we've been asked, but you can always file an [issue](https://github.com/webqit/oohtml/issues) to ask a new question or raise a suggestion.

## Issues
To report bugs or request features, please submit an [issue](https://github.com/webqit/oohtml/issues).

## License
MIT.
