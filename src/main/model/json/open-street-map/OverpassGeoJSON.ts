import { OsmLocationCustomTags } from "./OsmLocationCustomTags"
import { OsmLocationTags } from "./OsmLocationTags"

/**
 * https://wiki.openstreetmap.org/wiki/Overpass_turbo/GeoJSON
 */
export interface OverpassGeoJSON<T extends OsmLocationTags, C extends OsmLocationCustomTags> {
    "type": "FeatureCollection",
    "generator": string
    "copyright": string
    "timestamp": string
    "features": OverpassGeoJSONFeature<T, C>[]
}

export interface OverpassGeoJSONFeature<T extends OsmLocationTags, C extends OsmLocationCustomTags> {
    "type": "Feature"
    "id": string // node/<OSM id>
    "geometry": {
        "type": "Point",
        /**
         * [longitude, latitude]
         *
         * Or [x, y].
         */
        "coordinates": [number, number]
    }
    "properties": T & C & {
        "@id": string, // node/<OSM id>
    }
}
