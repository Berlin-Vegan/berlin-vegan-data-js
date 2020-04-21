import * as packageJson from "../../../../package.json"
import { NativeGastroLocation } from "../../model/json/native/NativeGastroLocation"
import { NativeLocation } from "../../model/json/native/NativeLocation"
import { NativeShoppingLocation } from "../../model/json/native/NativeShoppingLocation"
import { OsmGastroLocationCustomTags } from "../../model/json/open-street-map/OsmGastroLocationCustomTags"
import { OsmGastroLocationTags } from "../../model/json/open-street-map/OsmGastroLocationTags"
import { OsmLocationCustomTags } from "../../model/json/open-street-map/OsmLocationCustomTags"
import { OsmLocationTags } from "../../model/json/open-street-map/OsmLocationTags"
import { OsmShoppingLocationCustomTags } from "../../model/json/open-street-map/OsmShoppingLocationCustomTags"
import { OsmShoppingLocationTags } from "../../model/json/open-street-map/OsmShoppingLocationTags"
import { OverpassGeoJSON, OverpassGeoJSONFeature } from "../../model/json/open-street-map/OverpassGeoJSON"
import { OsmConfig, OverpassConfig } from "../Config"
import * as conversion from "./OsmTagsExtractor"
import * as DefaultConfig from "../default-config.json"

export class OverpassGeoJSONConverter {

    private readonly osmTagsConverter: conversion.OsmTagsExtractor

    constructor(
        osmConfig: OsmConfig = DefaultConfig.osm,
        private readonly overpassConfig: OverpassConfig = DefaultConfig.overpass,
    ) {
        this.osmTagsConverter = new conversion.OsmTagsExtractor(osmConfig)
    }

    convertGastroLocations(
        locations: NativeGastroLocation[]
    ): OverpassGeoJSON<OsmGastroLocationTags, OsmGastroLocationCustomTags> {
        return this.convertLocations(
            locations,
            location => this.convertGastroLocation(location)
        )
    }

    convertShoppingLocations(
        locations: NativeShoppingLocation[]
    ): OverpassGeoJSON<OsmShoppingLocationTags, OsmShoppingLocationCustomTags> {
        return this.convertLocations(
            locations,
            location => this.convertShoppingLocation(location)
        )
    }

    private convertLocations<
        L extends NativeLocation,
        T extends OsmLocationTags,
        C extends OsmLocationCustomTags
    >(
        locations: L[],
        getFeature: (location: L) => OverpassGeoJSONFeature<T, C>,
    ): OverpassGeoJSON<T, C> {
        return {
            type: "FeatureCollection",
            generator: packageJson.name,
            copyright: this.overpassConfig.copyright,
            timestamp: this.overpassConfig.placeholders.timestamp,
            features: locations.map(it => getFeature(it)),
        }
    }

    convertGastroLocation(
        location: NativeGastroLocation
    ): OverpassGeoJSONFeature<OsmGastroLocationTags, OsmGastroLocationCustomTags> {
        return this.convertLocation(
            location,
            this.osmTagsConverter.getGastroLocationTags(location),
            this.osmTagsConverter.getGastroLocationCustomTags(location)
        )
    }

    convertShoppingLocation(
        location: NativeShoppingLocation
    ): OverpassGeoJSONFeature<OsmShoppingLocationTags, OsmShoppingLocationCustomTags> {
        return this.convertLocation(
            location,
            this.osmTagsConverter.getShoppingLocationTags(location),
            this.osmTagsConverter.getShoppingLocationCustomTags(location)
        )
    }

    private convertLocation<T extends OsmLocationTags, C extends OsmLocationCustomTags>(
        location: NativeLocation,
        tags: T,
        customTags: C,
    ): OverpassGeoJSONFeature<T, C> {
        const nodeId = "node/" + this.overpassConfig.placeholders.nodeId
        return {
            type: "Feature",
            id: nodeId,
            geometry: {
                type: "Point",
                coordinates: [location.longCoord, location.latCoord]
            },
            properties: {
                "@id": nodeId,
                ...tags,
                ...customTags,
            },
        }
    }

}
