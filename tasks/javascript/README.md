# [Gents Agency Gulp Registry](../../README.md) — JavaScript

Running `gulp javascript` triggers both an ES6 and Babel task.  
The `gulp javascript:es6` task uses [Rollup](https://github.com/rollup/rollup) to bundle all `import` statements and tree-shake dead code.  
The `gulp javascript:es5` task runs Browserify to create an ES5 compatible bundle with module management etc.

Both tasks also include a minified file (through `babel-minify` for the ES6 bundle & `uglify` for the ES5 bundle).

This leaves us with four files: `app.es6.js`, `app.es6.min.js`, `app.js` & `app.min.js`.

As a loading strategy you can do some easy mustard-cutting on Custom Elements support to load the ES6 bundle or load the necessary polyfills and the ES5 bundle.  

```html
<script>
    (function(w, d) {
        function loadScript(src, async, defer) {
            var s = d.createElement('script');
            s.async = !!async;
            s.defer = !!defer;
            s.src = src;

            d.head.appendChild(s);
        };

        // Mustard Cutting. If there is native Custom Elements (v1)
        // we assume decent ES6 support & load in the Rollup bundle.
        // Else, we load a fallback & run the transpiled bundle from Babel
        if ('customElements' in window) {
            loadScript('/assets/js/app.es6.js', false, true);
        } else {
            if (!('MutationObserver' in window)) {
                // Don't even try to polyfill
                return;
            }

            loadScript('/assets/js/custom-elements.js', false, true);
            loadScript('/assets/js/app.js', false, true);
        }
    })(window, document);
</script>
```