# Web UI for OSM project

## Using epam theme less files

The first rule is to use this base path for files: ```../styles/epam-theme/less/```
Somehow if you try to use different paths webpack loader processes the same file multiply times.
This increases building time dramatically

Try to avoid importing less files in our less files.

But if you still need this try not to import big files.
For instance colors variables are declared in all les files.
This is strange - but always try to find the smallest file to include.

Please use @import (reference) '...' instead @import '...'. 'reference' attribute removing
css duplicates

## Style rules examples (we should add oui- prefix for all our classes)

/* A component */
.oui-button { }

/* A component modifier (modifying .oui-button) */
.oui-button--primary { }

/* A component sub-object (lives within .oui-button) */
.oui-button__icon { }

