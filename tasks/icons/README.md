# [Gents Agency Gulp Registry](../../README.md) — Icons

All SVG files from the source icons directory are compiled to a single SVG spritesheet with `<symbol>` definitions.

```html
<svg title="Facebook">
	<use xlink:href="/assets/icons/icons.svg#facebook"/>
</svg>
```

> External SVG means no Internet Explorer support. If you want to support icons in Internet Explorer too, use [svg4everybody](https://jonathantneal.github.io/svg4everybody/) as a polyfill.
