# Friday Night Fever Dream / Varsity Signal Figma Plugin

Generates an editable MaxPreps high school sports style guide in Figma.

## Run

1. Open this folder in a terminal:
   `/Users/brian.eckmann/Documents/GitHub/MPI/projects/Varsity Signal`
2. Install dependencies:
   `npm install`
3. Build the plugin:
   `npm run build`
4. In Figma, go to `Plugins > Development > Import plugin from manifest...`
5. Select:
   `manifest.json`
6. Run `Friday Night Fever Dream Style Guide`.

The plugin creates a page named `Friday Night Fever Dream Style Guide`, local paint styles, local text styles, reusable components, and a large editable style guide frame.

## Typography Fallbacks

The plugin checks installed fonts and falls back in this order:

- Display: `Champion Gothic`, `Druk Condensed`, `Impact`, `Arial Narrow`, `Arial`
- Marker: `Marker Sport`, `Permanent Marker`, `Comic Sans MS`, `Arial`
- Mono: `Chivo Mono`, `Roboto Mono`, `IBM Plex Mono`, `Courier New`
- UI: `Siro`, `Inter`, `Arial`

If the exact commercial fonts are not installed, the generated file includes a visible fallback note in the Typography section.

## Output Structure

- `00 Cover`
- `01 Brand Principle`
- `02 Color System`
- `03 Typography`
- `04 Photography Treatment`
- `05 Textures + Motifs`
- `06 UI Components`
- `07 Application Examples`
- `08 Motion Language`
- `09 Usage Rules`
- `10 Final Lockup`

