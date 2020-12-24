# OOHTML

<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/@webqit/oohtml" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@webqit/oohtml.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@webqit/oohtml" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@webqit/oohtml.svg" alt="NPM downloads" /></a></span>

<!-- /BADGES -->

[Object-Oriented HTML (OOHTML)](https://webqit.io/tooling/oohtml) is a suite of new DOM features that particularly facilitates writing modular HTML, CSS, and JavaScript *natively* and *more conveniently*. It addresses a number of limitions inherent to existing conventions, and welcomes much of the paradigms associated with modern UI development.

> OOHTML is being proposed as a [W3C standard at the Web Platform Incubator Community Group](https://discourse.wicg.io/t/proposal-chtml/4716). Consider bringing your ideas to the discussion.

> [Visit project homepage](https://webqit.io/tooling/oohtml).

## Low-Level Features
OOHTML brings certain new features to native web languages to make common UI design terminologies possible natively.

+ **Modular Naming and APIs** - *Naming and finding things* is hard; modular design makes it easier! But coming to HTML, we find a naming system that makes it difficult to keep things to small-sized scopes. There is only one global scope for IDs and CSS selectors and this kills any effort towards having a modular markup; we end up in terrible *hacks* and much naming wars, or at best, clunky naming conventions like [BEM](https://getbem.com). OOHTML addresses this design and architectural difficulty with two specifications that particularly facilitate modular design thinking: [Namespaced HTML](https://webqit.io/tooling/oohtml/namespaced-html) and [HTML Modules](https://webqit.io/tooling/oohtml/html-modules).
+ **State and Observability** - The concept of building stateful applications and keeping track of all the moving parts have not particularly found a place among native web languages. Much engineering still goes into using JavaScript's change-detection mechanisms for "reactive" UI development, and everything quickly becomes very complex to reason about. OOHTML addresses this challenge, first at the language level, with the [Observer API](https://webqit.io/tooling/oohtml/the-observer-api); then, at the DOM level, with [The State API](https://webqit.io/tooling/oohtml/the-state-api) that implements the Observer API.

## Higher-Level Features
OOHTML provides features that offer *syntactic sugar* over its low-level features and existing DOM APIs.

+ **Scoped Scripts** - Scoped Scripts is a new feature that lets us write `<script>` elements that are scoped to their immediate host elements instead of the global browser scope. Scoped Scripts makes it easier to apply behaviour to modular markup as they execute in the context of their host elements. They are especially powerful in being able to automatically keep the UI in sync with tha state of an application as they internally implement the [Observer API](https://webqit.io/tooling/oohtml/the-observer-api). [Visit the details](https://webqit.io/tooling/oohtml/scoped-scripts) to learn more.
+ **HTML Imports** - HTML Imports is a new templating feature that abstracts over the [HTML Modules Specification](https://webqit.io/tooling/oohtml/html-modules) to provide incredibly powerful composability in the simple language of tags and attributes. [Visit the details](https://webqit.io/tooling/oohtml/html-imports) to learn more.

## Getting Started
To add the current OOHTML polyfill to your page, follow [the installation guide](https://webqit.io/tooling/oohtml/installation).

The following examples give us a glimpse of what's possible with OOHTML. Links from these examples contain much further details.

### Namespaced HTML
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

*Details are in the [Namespaced HTML](https://webqit.io/tooling/oohtml/namespaced-html) section.*

### State and Observability
The [Observer API](https://webqit.io/tooling/oohtml/the-observer-api) lets us observe objects in real time:

```js
Observer.observe(continents.namespace, mutations => {
    mutations.forEach(mutation => {
        console.log(mutation.type, mutation.name, mutation.path, mutation.value, mutation.oldValue);
    });
});
```

With the code above, adding a new ID - `africa` - to the `continents` namespace would be reported in the console.

```js
let section = document.createElement('section');
section.setAttribute('id', 'africa');
continents.append(section);
```

The document object and every DOM element also feature [The State API](https://webqit.io/tooling/oohtml/the-state-api) that lets us maintian application state at the document and element levels:

```js
Observer.observe(continents.state, mutations => {
    // Set application data to element attributes
    // and keep them in sync
    mutations.forEach(mutation => {
        continents.setAttribute(mutation.name, mutation.value);
    });
});
```

With the code above, setting properties on `continents.state` would update the element.

```js
continents.state.title = 'List of continents';
// Or
continents.setState({
    title: 'List of continents',
});
```

We could easily update continents in the `#continents` tree this way:

```js
// Bind application data to section elements
Observer.observe(continents.state, mutations => {
    mutations.forEach(mutation => {
        let sectionElement = continents.namespace[mutation.name];
        sectionElement.namespace.about.innerHTML = mutation.value.about;
        sectionElement.namespace.countries.innerHTML = mutation.value.countries;
    });
});
// Update the "Asia" section
continents.state.asia = {
    about: 'About Asia (NEW)',
    countries: 'Countries in Asia (NEW)',
};
```

And we could easily add new continents to the `#continents` tree this way:

```js
// Bind application data to section elements
Observer.observe(continents.state, mutations => {
    mutations.forEach(mutation => {
        let sectionElement = continents.namespace[mutation.name];
        if (!sectionElement) {
            let sectionElement = document.createElement('section');
            sectionElement.setAttribute('id', mutation.name);
            // ------------
            let aboutElement = document.createElement('div');
            aboutElement.setAttribute('id', 'about');
            let countriesElement = document.createElement('div');
            countriesElement.setAttribute('id', 'countries');
            // ------------
            sectionElement.append(aboutElement, countriesElement);
            continents.append(sectionElement);
        }
        sectionElement.namespace.about.innerHTML = mutation.value.about;
        sectionElement.namespace.countries.innerHTML = mutation.value.countries;
    });
});
// Add an "Africa" section
continents.state.africa = {
    about: 'About Africa',
    countries: 'Countries in Africa',
};
```

But just so we keep markup out of JavaScript code, we could employ a [*named* `<template>` element](https://webqit.io/tooling/oohtml/html-modules) to hold the markup separately:

```html
<head>
    <template name="template1">

        <section exportgroup="continent" id="" namespace>
            <div id="about"></div>
            <div id="countries"></div>
        </section>

    </template>
</head>
```

```js
// Bind application data to section elements
Observer.observe(continents.state, mutations => {
    mutations.forEach(mutation => {
        let sectionElement = continents.namespace[mutation.name];
        if (!sectionElement) {
            let template1 = document.templates.template1;
            sectionElement = template1.exports.continent[0].cloneNode(true);
            sectionElement.setAttribute('id', mutation.name);
            continents.append(sectionElement);
        }
        sectionElement.namespace.about.innerHTML = mutation.value.about;
        sectionElement.namespace.countries.innerHTML = mutation.value.countries;
    });
});
```

Now, we could build web components more efficiently this way.

*Details are in the [State API](https://webqit.io/tooling/oohtml/the-state-api) and [HTML Modules](https://webqit.io/tooling/oohtml/html-modules) sections.*

### Scoped Scripts
The following `<script>` element is scoped to the `#alert` element - its host element:

```html
<div id="alert">

    <div class="message"></div>
    <div class="exit" title="Close this message.">X</div>

    <script scoped>
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

        <script scoped>
            // Render the "message" property from the element's state object
            this.querySelector('.message').innerHTML = this.state.message;
            this.querySelector('.exit').addEventListener('click', () => {
                this.remove();
            });
        </script>

    </div>

<body>
```

If we defined the scoped script as `type="subscript"`, changes that happen to live objects, like the element's *state* object, will automatically re-run specific statements in the script. This gives us *Reactive Scripting*.

```html
<body>

    <div id="alert">

        <div class="message"></div>
        <div class="exit" title="Close this message.">X</div>

        <script type="subscript" scoped>
            // Render the "message" property from the element's state object
            // This statement will re-run each time "this.state.message" gets updated
            this.querySelector('.message').innerHTML = this.state.message;
            this.querySelector('.exit').addEventListener('click', () => {
                this.remove();
            });
        </script>

    </div>

    <script>
        let alertElement = document.querySelector('#alert');
        alertElement.state.message: 'Task started!';
        setTimeout(() => {
            alertElement.state.message: 'Task complete!';
        }, 1000);
    </script>

</body>
```

This makes it possible to build more complex stuff without breaking a sweat. [Think a clock, a dynamic list](https://webqit.io/tooling/oohtml/examples), etc.

*Details are in the [Scoped Scripts](https://webqit.io/tooling/oohtml/scoped-scripts) section.*

### HTML Imports
The following `<template>` elements contain reusable snippets called exports:

```html
<head>

    <template name="template1">
        <div exportgroup="export-1">This is export1 in template1</div>
        <div exportgroup="export-2">This is export2 in template1</div>
    </template>
    <template name="template2">
        <div exportgroup="export-3">This is export3 in template2</div>
        <div exportgroup="export-4">This is export4 in template2</div>
    </template>

</head>
```

An element in the `<body>` area can point to the `<template>` element and *implement* its exports:

```html
<body>

    <!-- Point to the template element -->
    <div template="template1">
        <h2>I have imports</h2>
        <!-- Place export-1 here -->
        <import name="export-1"></import>

        <div>
            <!-- Place export-2 here -->
            <import name="export-2"></import>
        </div>
    </div>

</body>
```

*Import* elements themselves can also point to a `<template>` directly:

```html
<body>

    <!-- Point to the template element -->
    <div template="template1">
        <h2>I have imports</h2>
        <!-- Place export-1 here -->
        <import name="export-1"></import>

        <div>
            <!-- Point to template2 and place export-3 here -->
            <import name="export-3" template="template2"></import>
        </div>
    </div>

</body>
```

An element can be dynamically pointed at another `<template>`, and its *imports* will be automatically resolved from the new `<template>`:

```js
document.querySelector('div[template="template1"]').setAttribute('template', 'template2');
```

This opens up new simple ways to create very dynamic applications. [Think a Single Page Application](https://webqit.io/tooling/oohtml/examples) (SPA).

*Details are in the [HTML Imports](https://webqit.io/tooling/oohtml/html-imports) section.*

## FAQs
We are working on publishing some questions we've been asked, but you can always file an [issue](https://github.com/webqit/oohtml/issues) to ask a new question or raise a suggestion.

## Relationship With Other Technologies
There is a [related technologies](https://webqit.io/tooling/oohtml/related-technologies) section that gives a view of how OOHTML compares with existing technologies and related standardization efforts.

## Issues
To report bugs or request features, please submit an [issue](https://github.com/webqit/oohtml/issues).

## License
MIT.
