# berlin-vegan-data-js

[![npm version](https://badge.fury.io/js/%40berlin-vegan%2Fberlin-vegan-data-js.svg)](
    https://badge.fury.io/js/%40berlin-vegan%2Fberlin-vegan-data-js
)

A library and stand-alone program that specifies the native open-source JSON format used by Berlin-Vegan
and allows to convert data in this format to be converted to OpenStreetMap/Overpass and Schema.org JSON formats.

## Native format

The backend [berlin-vegan-data](https://github.com/Berlin-Vegan/berlin-vegan-data) and the
[berlin-vegan-tools](https://github.com/Berlin-Vegan/berlin-vegan-tools) generate JSON files of the native
format. The TypeScript files in
[`src/main/model/json/native`](
    https://github.com/Berlin-Vegan/berlin-vegan-data-js/tree/master/src/main/model/json/native
) specify it.

## API endpoints

For Berlin-Vegan, the API endpoints are:

- Gastronomy locations: <http://www.berlin-vegan.de/app/data/GastroLocations.json>
- Shopping locations: <http://www.berlin-vegan.de/app/data/ShoppingLocations.json>

## Conversion

You can covert data in the native format to the following target formats:

- [OSM JSON](https://wiki.openstreetmap.org/wiki/OSM_JSON)
  For data that cannot be expressed with OpenStreetMap tags, we add custom tags at
  `elements/custom_tags/custom:*`.
- [Overpass GeoJSON](https://wiki.openstreetmap.org/wiki/Overpass_turbo/GeoJSON)
  For data that cannot be expressed with OpenStreetMap tags, we add properties prefixed with "custom:".
- [Schema.org](https://schema.org/)
  Only a subset of the information can be expressed in this format, and we do not add custom properties.

For Overpass formats, we use established [OpenStreetMap keys](https://wiki.openstreetmap.org/wiki/Category:Keys)
where possible, but we also use some additional key that we deem appropriate for OpenStreetMaps.
Information not appropriate for OSM goes into custom tags. OSM tags have string values, but custom tags may be
structured.

For some information, there are multiple established OSM tags, e.g. "email" and "contact:email".
You may opt to include these redundant tags.

## Usage

### Command-line

Example:

```sh
berlin-vegan-data-js --schema schema-org -in http://www.berlin-vegan.de/app/data/GastroLocations.json --config config.json
```

For the format of the config file, see
[`src/main/conversion/Config.ts`](
    https://github.com/Berlin-Vegan/berlin-vegan-data-js/tree/master/src/main/conversion/Config.ts
)
and
[`src/main/conversion/default-config.json`](
    https://github.com/Berlin-Vegan/berlin-vegan-data-js/tree/master/src/main/conversion/default-config.json
)
.

To see all options, run:

```sh
berlin-vegan-data-js --help
```

### API

Example:

```js
import { SchemaOrgConverter } from "@berlin-vegan/berlin-vegan-data-js"

...

const foodEstablishments = new SchemaOrgConverter(config).convertGastroLocations(locations)
```

## Development

No global modules other than `npm` are necessary.

- Run `npm install` once after checking out.
- Then, run either `npm test` for a single full build cycle (clean, compile, lint, test),
  or `npm start` for running the full cycle initially and then watch for file changes which will
  trigger appropriate parts of the build cycle (compile, lint, test). The watch mode is not bulletproof:
  It works for file updates, but you may get problems if you rename or delete files.
- Publish with `npm publish --access public`. This will run the full build cycle before publishing.

## License

AGPL-3.0-only (see `LICENSE.txt`)\
Copyright (C) 2015-2020  Berlin-Vegan
