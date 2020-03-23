# &lt;C&sbquo;HTML /&gt;
> An HTML-based component System that’s as Simple and Universal as HTML Itself!

CHTML is a framework for designing UI components at markup level. It is aptly named as it entirely shifts UI development from the JavaScript realm to plain HTML. And this is an important change!

## Why CHTML
So we discovered that standard HTML provides an opportunity to implement UI components in plain HTML so that we do not need to go all the way to JavaScript. We built CHTML to unlock this opportunity to be more efficient.

### Our Quest For Componentization Lies In Tags and Attributes!
We less think about it, but the HTML language is, by design, the “blueprint” on which all the powerful technologies of the modern UI draw. In just tags and attributes, we are able to lay out structure, define presentation and behaviour, integrate and communicate with countless technologies that live behind the screen. Here’s a refresher:
+	Structure: Simple HTML tags let us blueprint a document structure that eventually translates to the highly-connected Document Object Model (DOM) - the DOM Tree.
+	Presentation: The style attribute (along with the style tag) lets us declare rules that drive an intricate presentation technology behind the scene. We have SVG, canvas, WAAPI and lots of related presentation technologies that all live on tags and attributes.
+	Behaviour: Event attributes, like the onclick attribute, serve as directives that let us consume the browser’s public API, and perform any magic imaginable. The script tag lets HTML even accommodate entire functionalities.
+	Accessibility: The ARIA family of attributes helps us designate semantic roles, relationships, and states that altogether expose the document for some complex accessibility technology.
+	Extensibility: And, so that we can cater for the unknown, HTML offers the data attributes, the script tag for Data Blocks, Custom Elements, custom attributes, and etc. A thoughtful combination of these should be able to drive the UI’s next technology. Now we have the keys to new possibilities!

### The Family of Component-Oriented Tags and Attributes
CHTML is another technology that draws on tags and attributes – this time, to allow us compose the UI as a component tree and orchestrate just about any behaviour possible!
+	Structure: Just like the ARIA technology, CHTML relies on roles and relationships to establish a component and to form a Component Tree. The `chtml-role` attribute lets us explicitly designate such roles and relationships, and we can, at the same time, draw on standard semantic relationships and ARIA roles. Our app and the UI can now simply communicate in terms of some component tree instead of the DOM tree. (Structural concepts are covered [here](https://docs.web-native.dev/chtml/guide/structural-concepts/).)
+	Behaviour: HTML naturally factors behaviour into attributes; so CHTML factors behaviour into the `chtml-directives` attribute. HTML’s behavioural language is transparently JavaScript. (e.g: `onclick=”alert()”`.) CHTML follows suite with [JSEN](https://github.com/web-native/jsen/) (JavaScript Expression Notation) that lets us declare directives for consuming functionalities available in a component object. (Behavioural concepts are covered [here](https://docs.web-native.dev/chtml/guide/behavioural-concepts/).)
+	Composition: Without demanding more than tags and attributes, CHTML lets us build parts of the UI separately as independent components and helps us put these together automatically. (Compositional concepts are covered [here](https://docs.web-native.dev/chtml/guide/compositional-concepts/).)

### The New Possibilities!
We enjoy talking about how far HTML can take us! We built CHTML to unlock all the possibilities!
+	Simplicity - The Long Story Short!: Think how much now gets out of the way with having components that live as plain HTML files! No compiling from language A to language B; no build step; no complex tooling; no overkill.
+	The Separation of Concerns: With application data and logic now decoupled from the UI, no more tangling of concerns and code, where you have to keep track of application code amidst markup, and vice-versa. Being able to address individual concerns in their respective expertise and thought-process gives us more room for perfection and less room for bugs. We end up with a better and more maintaining code base.
+	Fine-Grained Composability: CHTML’s fine-grained composability (imports and recomposition, inheritance and cascading) takes reusability to a level far higher than what’s generally possible. This is fine as we want to do more with fewer components, and at the end of the day, keep things few. Less is more!
+	Future-Proof Development: Go far with just tags and attributes – CHTML’s future-proof basis of operation! Now, this is a protection, a bet on stability and relevance, and thus, the best way to approach the future! No risk of frequent app rewrites in response to fast-changing APIs and unstable methodologies.
+	Universality and Interoperability: With tags and attributes, write and share components in the universal UI language of the web. Take things even further! It is now possible for every piece of the UI to work wherever HTML works; no hard dependencies; no complex engineering! So inspect, manipulate, or generate UI components cheaply with any DOM-based tooling, or anything else that reads and writes HTML! 
+	Apps with Better Team Work: It is now possible to put up UIs of just about any complexity with standard expertise in HTML; no steep learning curve; no cognitive barrier! No hassles with team or community adoption; no restrictive talent sourcing!

If you come from some other development school of thought, we invite you to compare the cost!

## Get Started!
In a matter of minutes, you can be sure to cover the entire concepts on which CHTML runs. This is because CHTML has been intentionally designed on only a minimal footprint and thus stays out of the way of the standard web technologies it represents. So your current design/developmemt skills remain your key to success with CHTML! 

Here is everything in three sections… and it makes more sense to follow through in this order…
+	[Structural Concepts](https://docs.web-native.dev/chtml/guide/structural-concepts/)
+	[Behavioural Concepts](https://docs.web-native.dev/chtml/guide/behavioural-concepts/)
+	[Compositional Concepts](https://docs.web-native.dev/chtml/guide/compositional-concepts/)

The [Getting Started](https://docs.web-native.dev/chtml/guide/) guide contains download instructions.

## Issues
To report bugs or request features, please submit an issue to this repository.

## License
MIT.
