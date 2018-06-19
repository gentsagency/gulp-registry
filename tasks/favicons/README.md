# [Gents Agency Gulp Registry](../../README.md) — Favicons

A variety of sizes for all modern devices will be generated from two sources:

- `favicon.png`: transparent 512×512px with the icon as big as possible
- `favicon.svg`: no color, single path, 16×16px viewbox

There are two options that you can add to `config.js`:

- `backgroundColor`: specify the background color for the non-transparent icons
- `padding`: the resize ratio to render some padding (a number between 0 and 1)

## Usage

There are two subtasks. Running `gulp favicons` runs only the `generate` subtask.

- `gulp favicons:generate` generates all different PNG sizes
- `gulp favicons:html` outputs the HTML for the generated PNG sizes

## Troubleshooting

Having trouble running this task?  
Make sure `graphicsmagick` is installed on your computer.
