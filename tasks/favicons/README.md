# [Gents Agency Gulp Registry](../../README.md) — Favicons

A variety of sizes for all modern devices will be generated from two sources:

- `favicon.png`: transparent 512×512px with the icon as big as possible
- `favicon.svg`: no color, single path, 16×16px viewbox

There are two options that you can add to `config.js`:

 - `backgroundColor`: specify the background color for the non-transparent icons
 - `padding`: the resize ratio to render some padding (a number between 0 and 1)

> *Having trouble running this task? Make sure `graphicsmagick` is installed on your computer.*
