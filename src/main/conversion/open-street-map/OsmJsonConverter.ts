import * as packageJson from "../../../../package.json"
import { NativeGastroLocation } from "../../model/json/native/NativeGastroLocation"
import { NativeShoppingLocation } from "../../model/json/native/NativeShoppingLocation"
import { OsmGastroLocationCustomTags } from "../../model/json/open-street-map/OsmGastroLocationCustomTags"
import { OsmGastroLocationTags } from "../../model/json/open-street-map/OsmGastroLocationTags"
import { OsmShoppingLocationCustomTags } from "../../model/json/open-street-map/OsmShoppingLocationCustomTags"
import { OsmShoppingLocationTags } from "../../model/json/open-street-map/OsmShoppingLocationTags"
import { OsmJsonElement, OsmJson } from "../../model/json/open-street-map/OsmJson"
import { OsmConfig, OverpassConfig } from "../Config"
import { OsmTagsExtractor } from "./OsmTagsExtractor"
import * as DefaultConfig from "../default-config.json"

export class OsmJsonConverter {

    private readonly osmTagsConverter: OsmTagsExtractor

    constructor(
        osmConfig: OsmConfig = DefaultConfig.osm,
        private readonly overpassConfig: OverpassConfig = DefaultConfig.overpass,
    ) {
        this.osmTagsConverter = new OsmTagsExtractor(osmConfig)
    }

    convertGastroLocations(
        locations: NativeGastroLocation[]
    ): OsmJson<OsmGastroLocationTags, OsmGastroLocationCustomTags> {
        return {
            version: packageJson._versionNumber,
            generator: packageJson.name,
            copyright: this.overpassConfig.copyright,
            license: this.overpassConfig.license || undefined,
            elements: locations.map(it => this.convertGastroLocation(it)),
        }
    }

    convertShoppingLocations(
        locations: NativeShoppingLocation[]
    ): OsmJson<OsmShoppingLocationTags, OsmShoppingLocationCustomTags> {
        return {
            version: packageJson._versionNumber,
            generator: packageJson.name,
            copyright: this.overpassConfig.copyright,
            license: this.overpassConfig.license || undefined,
            elements: locations.map(it => this.convertShoppingLocation(it)),
        }
    }

    convertGastroLocation(
        location: NativeGastroLocation
    ): OsmJsonElement<OsmGastroLocationTags, OsmGastroLocationCustomTags> {
        return {
            type: "node",
            id: this.overpassConfig.placeholders.nodeId,
            lat: location.latCoord,
            lon: location.longCoord,
            tags: this.osmTagsConverter.getGastroLocationTags(location),
            custom_tags: this.osmTagsConverter.getGastroLocationCustomTags(location),
        }
    }

    convertShoppingLocation(
        location: NativeShoppingLocation
    ): OsmJsonElement<OsmShoppingLocationTags, OsmShoppingLocationCustomTags> {
        return {
            type: "node",
            id: this.overpassConfig.placeholders.nodeId,
            lat: location.latCoord,
            lon: location.longCoord,
            tags: this.osmTagsConverter.getShoppingLocationTags(location),
            custom_tags: this.osmTagsConverter.getShoppingLocationCustomTags(location),
        }
    }
}
