import { OsmGastroLocationCustomTags } from "../../model/json/open-street-map/OsmGastroLocationCustomTags"
import { OsmGastroLocationTags } from "../../model/json/open-street-map/OsmGastroLocationTags"
import { OsmLocationCustomTags } from "../../model/json/open-street-map/OsmLocationCustomTags"
import { OsmLocationTags } from "../../model/json/open-street-map/OsmLocationTags"
import { OsmShoppingLocationCustomTags } from "../../model/json/open-street-map/OsmShoppingLocationCustomTags"
import { OsmShoppingLocationTags } from "../../model/json/open-street-map/OsmShoppingLocationTags"
import { OsmJsonElement } from "../../model/json/open-street-map/OsmJson"
import { FoodEstablishment } from "../../model/json/schema-org-json-ld/FoodEstablishment"
import { JsonLd } from "../../model/json/schema-org-json-ld/JsonLd"
import { LocalBusiness } from "../../model/json/schema-org-json-ld/LocalBusiness"
import { NativeGastroLocation } from "../../model/json/native/NativeGastroLocation"
import { Config } from "../Config"
import { OsmJsonConverter } from "../open-street-map/OsmJsonConverter"
import { NativeShoppingLocation } from "../../model/json/native/NativeShoppingLocation"
import * as DefaultConfig from "../default-config.json"

export class SchemaOrgConverter {

    private readonly overpassConverter: OsmJsonConverter

    constructor(private readonly config: Config = DefaultConfig) {
        this.overpassConverter = new OsmJsonConverter(config.osm, config.overpass)
    }

    convertGastroLocations(locations: NativeGastroLocation[]): JsonLd<FoodEstablishment>[] {
        return locations
            .map(it => this.overpassConverter.convertGastroLocation(it))
            .map(it => this.convertGastroLocationElement(it))
    }

    convertShoppingLocations(locations: NativeShoppingLocation[]): JsonLd<LocalBusiness>[] {
        return locations
            .map(it => this.overpassConverter.convertShoppingLocation(it))
            .map(it => this.convertShoppingLocationElement(it))
    }

    convertGastroLocationElement(
        e: OsmJsonElement<OsmGastroLocationTags, OsmGastroLocationCustomTags>,
    ): JsonLd<FoodEstablishment> {
        return {
            ...this.getLocalBusiness(e),
            "@context": "http://schema.org",
            "@type": getTypesFromAmenity(e.tags.amenity),
            "email": e.tags.email,
            "image": e.custom_tags["custom:images"][0]?.url,
        }
    }

    convertShoppingLocationElement(
        e: OsmJsonElement<OsmShoppingLocationTags, OsmShoppingLocationCustomTags>,
    ): JsonLd<LocalBusiness> {
        return {
            ...this.getLocalBusiness(e),
            "@context": "http://schema.org",
            "@type": getTypesFromShopTags(e.custom_tags["custom:tags"]),
        }
    }

    private getLocalBusiness(e: OsmJsonElement<OsmLocationTags, OsmLocationCustomTags>): LocalBusiness {
        return {
            openingHours: getOpeningHours(e.tags.opening_hours),
            address: {
                addressCountry: e.tags["addr:country"],
                streetAddress: e.tags["addr:street"] + " " + e.tags["addr:housenumber"],
                postalCode: e.tags["addr:postcode"],
            },
            review: e.custom_tags["custom:review:text"] && e.custom_tags["custom:review:url"] ? {
                text: this.config.schemaOrg.includeReviewText ? e.custom_tags["custom:review:text"] : undefined,
                url: e.custom_tags["custom:review:url"]
            } : undefined,
            telephone: e.tags.phone,
            latitude: e.lat,
            longitude: e.lon,
            description: e.tags.description,
            name: e.tags.name,
            url: e.tags.website ?? e.tags.facebook,
        }
    }
}

function getTypesFromAmenity(amenity: string): string | string[] {
    const values = amenity.split(";").map(it => {
        switch (it) {
            case "pub": return "BarOrPub"
            case "cafe": return "CafeOrCoffeeShop"
            case "ice_cream": return "IceCreamShop"
            case "fast_food": return "FastFoodRestaurant"
            case "restaurant": return "BarORestaurantrPub"
            default: throw new Error(`Illegal amenity value "${it}".`)
        }
    })
    return values.length === 1 ? values[0] : values
}

function getTypesFromShopTags(tags: string[]): string | string[] {
    const values = [...new Set(tags.map(it => {
        switch (it) {
            // LocalBusiness/Shop
            case "foods": return "GroceryStore"
            case "clothing": return "ClothingStore"
            case "supermarket": return "ConvenienceStore"
            // LocalBusiness/HealthAndBeautyBusiness
            case "hairdressers": return "HairSalon"
            case "tattoostudio": return "TattooParlor"
            // LocalBusiness
            case "accommodation": // "Accomodation" does not fit the hierarchy.
            case "sports": // Defined too broadly
            case "toiletries": // No more specific match
                return "LocalBusiness"
            default: throw new Error(`Illegal tag "${it}".`)
        }
    }))]
    return values.length === 1 ? values[0] : values
}

function getOpeningHours(openStreetMapOpeningHours: string): string | string[] {
    const values = openStreetMapOpeningHours.split(";").map(it => it.trim())
    return values.length === 1 ? values[0] : values
}
