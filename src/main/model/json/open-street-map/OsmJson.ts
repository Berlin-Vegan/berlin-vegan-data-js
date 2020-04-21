import { OsmLocationCustomTags } from "./OsmLocationCustomTags"
import { OsmLocationTags } from "./OsmLocationTags"

/**
 * https://wiki.openstreetmap.org/wiki/OSM_JSON
 */
export interface OsmJson<T extends OsmLocationTags, C extends OsmLocationCustomTags> {
    "version": number
    "generator": string
    "copyright": string
    "license"?: string
    "elements": OsmJsonElement<T, C>[]
}

export interface OsmJsonElement<T extends OsmLocationTags, C extends OsmLocationCustomTags> {

    "type": "node"
    "id": number
    "lat": number
    "lon": number
    "tags": T
    "custom_tags": C
}
