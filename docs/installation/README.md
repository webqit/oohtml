# Installation Guide

This library is a polyfill for the proposed CHTML suite.

## On this Page

+ [Embed As Script](#embed-as-script)
  + [Embed The Complete Suite](#embed-the-complete-suite)
  + [Embed Individual Features](#embed-individual-features)
+ [Install Via NPM](#install-via-npm)
  + [Initialize the Complete Suite](#initialize-the-complete-suite)
  + [Initialize Individual Features](#initialize-individual-features)
+ [Server-Side Initialization](#server-side-initialization)
+ [Next Steps](#next-steps)

## Embed As Script 

+ **Embed The Complete Suite** - Embed the build below for everything about CHTML.

  ```html
  <script src="https://unpkg.com/@web-native-js/chtml/dist/main.js"></script>
  ```

+ **Embed Individual Features** - Find a build below for a specific CHTML feature.

  + **Scoped HTML** - `<script src="https://unpkg.com/@web-native-js/chtml/dist/scoped-html.js"></script>`

  + **Scoped CSS** - `<script src="https://unpkg.com/@web-native-js/chtml/dist/scoped-css.js"></script>`

  + **Scoped JS** - `<script src="https://unpkg.com/@web-native-js/chtml/dist/scoped-js.js"></script>`

  + **HTML Partials** - `<script src="https://unpkg.com/@web-native-js/chtml/dist/html-partials.js"></script>`

## Install Via NPM

```text
$ npm i -g npm
$ npm i --save @web-native-js/chtml
```

The installed package is designed to be *initialized* with the *window* object of the current browser or server evironment. To do this, import the `ENV` object and assign the *window* object to it, then call the initializer.

+ **Initialize the Complete Suite** - Initialize the module below for everything about CHTML.

  ```js
  // Import
  import init, { ENV } from '@web-native-js/chtml';
  // Initialize
  ENV.window = window;
  init();
  ```

+ **Initialize Individual Features** - Find a module below for a specific CHTML feature.

  + **Scoped HTML**
    
    ```js
    // Import
    import init, { ENV } from '@web-native-js/chtml/src/scoped-html/index.js';
    // Initialize
    ENV.window = window;
    init();
    ```

  + **Scoped CSS**
    
    ```js
    // Import
    import init, { ENV } from '@web-native-js/chtml/src/scoped-css/index.js';
    // Initialize
    ENV.window = window;
    init();
    ```

  + **Scoped JS**
    
    ```js
    // Import
    import init, { ENV } from '@web-native-js/chtml/src/scoped-js/index.js';
    // Initialize
    ENV.window = window;
    init();
    ```

  + **HTML Partials**
    
    ```js
    // Import
    import init, { ENV } from '@web-native-js/chtml/src/html-partials/index.js';
    // Initialize
    ENV.window = window;
    init();
    ```

## Server-Side Initialization

Here is how CHTML could be initialized on DOM instances created on the server with a library like [jsdom](https://github.com/jsdom/jsdom) (using the `window` object from the DOM instance.)


```js
// Import the class directly
import init, { ENV } from '@web-native-js/chtml';
// Import jsDom
import jsdom from 'jsdom';
// Utilities we'll need
import fs from 'fs';
import path from 'path';

// Read the document file from the server
const documentFile = fs.readFileSync(path.resolve('./index.html'));
// Instantiate jsdom so we can obtain the "window" for CHTML
// Detailed instruction on setting up jsdom is available in the jsdom docs
const JSDOM = new jsdom.JSDOM(documentFile.toString());

// Initialize CHTML...
// and we'll be good to go
ENV.window = JSDOM.window;
init();
```

## Next Steps

Let's now learn the core concepts of CHTML.

+ [Chtml](/chtml/)



