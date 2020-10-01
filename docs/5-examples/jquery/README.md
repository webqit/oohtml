## A Tooling Example

Being a foundational technology, CHTML gives us every room to bring our own tooling. This example shows how we could use a DOM abstraction library, like jQuery, from scoped scripts.

Below, we're simply binding the `$` variable globally for use in every scoped script.

```html
<body>

    <div namespace id="alert">
        <div scoped:id="message"></div>
        <script type="scoped">
            $(this.namespace.message).html(message);
        </script>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        document.bind({$: window.jQuery});
        document.querySelector('#alert').bind({
            message: 'This task is now complete!',
        });
    </script>

</body>
```

Tooling can also help us acheive more efficient DOM manipulation. Generally, surgically updating the DOM may have performance implications on the UI, as arising from layout thrashing (see [this article](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing) on Web Fundamentals). But we also don't need as much as a *Virtual DOM* for this. A technique like that of [fast DOM](https://github.com/wilsonpage/fastdom) could just suffice.

This technique is natively implemented by the [PlayUI](https://docs.web-native.dev/play-ui) library which has a jQuery-like API. We will now use PlayUI as a drop-in replacement for jQuery.

[Check the live example here](https://web-native.dev/package/chtml/docs/demos/jquery.html)
 
```html
<body>

    <div namespace id="alert">
        <div scoped:id="message"></div>
        <script type="scoped">
            $(this.namespace.message).html(message).then(() => {
                // Do something sync
            });
        </script>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="//unpkg.com/@web-native-js/play-ui/dist/main.js"></script>
    <script>
        document.bind({$: window.WebNative.PlayUI});
        document.querySelector('#alert').bind({
            message: 'This task is now complete!',
        });
    </script>

</body>
```