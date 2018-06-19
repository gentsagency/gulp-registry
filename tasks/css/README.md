# [Gents Agency Gulp Registry](../../README.md) — CSS

CSS is transpiled by some PostCSS plugins to a final single CSS file. The source files are run through these processors:

1. **postcss-import** inlines all `@import` statements into a single CSS file.  
2. **postcss-preset-env** provides CSS4 compliance & runs Autoprefixer. Find [the docs here](https://preset-env.cssdb.org/).  
3. **postcss-nested** enables `&` behaviour and nested `@media`-queries much like SCSS.  

A `.min.css` version of every `.css` file in the source path also gets built (powered by `clean-css`).
