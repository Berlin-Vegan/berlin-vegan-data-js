import { NativeGastroLocation } from "../../model/json/native/NativeGastroLocation"
import { NativeLocation } from "../../model/json/native/NativeLocation"
import { NativeShoppingLocation } from "../../model/json/native/NativeShoppingLocation"
import { YesNoUnknown } from "../../model/json/native/YesNoUnknown"
import { OsmGastroLocationCustomTags } from "../../model/json/open-street-map/OsmGastroLocationCustomTags"
import { OsmGastroLocationTags } from "../../model/json/open-street-map/OsmGastroLocationTags"
import { OsmLocationCustomTags } from "../../model/json/open-street-map/OsmLocationCustomTags"
import { OsmLocationTags } from "../../model/json/open-street-map/OsmLocationTags"
import { OsmShoppingLocationCustomTags } from "../../model/json/open-street-map/OsmShoppingLocationCustomTags"
import { OsmShoppingLocationTags } from "../../model/json/open-street-map/OsmShoppingLocationTags"
import { OsmConfig } from "../Config"
import * as DefaultConfig from "../default-config.json"
import { inferRedundantGastroLocationTags, inferRedundantShoppingLocationTags } from "./OsmTagsInferrer"

export class OsmTagsExtractor {

    constructor(private readonly config: OsmConfig = DefaultConfig.osm) { }

    getGastroLocationTags(l: NativeGastroLocation): OsmGastroLocationTags {
        const tags: OsmGastroLocationTags = {
            ...this.getLocationTags(l),
            "toilets:wheelchair": convertYesNoUnknown(l.handicappedAccessibleWc),
            "addr:district": l.district,
            "dog": convertYesNoUnknown(l.dog),
            "highchair": convertYesNoUnknown(l.childChair),
            "catering": convertYesNoUnknown(l.catering),
            "outdoor_seating:capacity": l.seatsOutdoor === -1 ? undefined : l.seatsOutdoor.toString(),
            "indoor_seating:capacity": l.seatsIndoor === -1 ? undefined : l.seatsIndoor.toString(),
            "internet_access": (l.wlan === 1 ? "wlan" : undefined),
            "internet_access:fee": (l.wlan === 1 ? "no" : undefined),
            "diet:gluten_free": convertYesNoUnknown(l.glutenFree),
            "breakfast": convertYesNoUnknown(l.breakfast),
            "breakfast:brunch": convertYesNoUnknown(l.brunch),
            "delivery": convertYesNoUnknown(l.delivery),
            "email": l.email,
            "amenity":
                l.tags
                    .map(it => {
                        switch (it) {
                            case "Bar": return "pub"
                            case "Cafe": return "cafe"
                            case "Eiscafe": return "ice_cream"
                            case "Imbiss": return "fast_food"
                            case "Restaurant": return "restaurant"
                        }
                    })
                    .join(";"),
        }
        return this.config.inferRedundantTags ? inferRedundantGastroLocationTags(tags) : tags
    }

    getGastroLocationCustomTags(l: NativeGastroLocation): OsmGastroLocationCustomTags {
        return {
            ...this.getLocationCustomTags(l),
            "custom:images": l.pictures,
            "custom:public_transport": l.publicTransport,
            "custom:free_wlan": convertYesNoUnknown(l.wlan),
        }
    }

    getShoppingLocationTags(l: NativeShoppingLocation): OsmShoppingLocationTags {
        const tags: OsmShoppingLocationTags = {
            ...this.getLocationTags(l),
            shop: getShop(l),
            tourism: l.tags.indexOf("accommodation") > 0 ? "yes" : undefined,
        }
        return this.config.inferRedundantTags ? inferRedundantShoppingLocationTags(tags) : tags
    }

    getShoppingLocationCustomTags(l: NativeShoppingLocation): OsmShoppingLocationCustomTags {
        return {
            ...this.getLocationCustomTags(l),
            "custom:tags": l.tags,
        }
    }

    private getLocationTags(l: NativeLocation): OsmLocationTags {
        return {
            "name": l.name,
            "addr:street": decomposeStreet(l.street).street,
            "addr:housenumber": decomposeStreet(l.street).housenumber,
            "addr:postcode": l.cityCode.toString(),
            "addr:city": l.city,
            "addr:country": this.config.locationData.addressCountryCode,
            "addr:comment": decomposeStreet(l.street).comment,
            "phone":
                l.telephone ?
                    toInternationalPhone(l.telephone, this.config.locationData.phoneCountryCode)
                    :
                    undefined,
            "website": getWebsite(l),
            "facebook": getFacebook(l),
            "opening_hours": getOpeningHours(l),
            "opening_hours:comment": l.openComment ? l.openComment : undefined,
            "opening_hours:comment:en": l.openCommentEnglish ? l.openCommentEnglish : undefined,
            "diet:vegan": l.vegan === 5 ? "only" : "yes",
            "diet:vegetarian": l.vegan === 5 || l.vegan === 4 ? "only" : "yes",
            "description": l.comment,
            "description:en": l.commentEnglish,
            "organic": convertYesNoUnknown(l.organic),
            "wheelchair":
                l.handicappedAccessible === 1 ? "limited" : (l.handicappedAccessible === 0 ? "no" : undefined),
        }
    }

    private getLocationCustomTags(l: NativeLocation): OsmLocationCustomTags {
        return {
            "custom:id": l.id,
            "custom:date_created": getDateCreated(l),
            "custom:review:text": l.review,
            "custom:review:url": this.config.organizationBaseUrl + l.reviewURL,
        }
    }
}

/**
 * Workaround for a server bug: wrong property name
 *
 * TODO: Remove when bug has been fixed.
 */
function getDateCreated(location: NativeLocation): string | undefined {
    return location.dateCreated ?? (location as any).created
}

function decomposeStreet(street: string): { street: string, housenumber?: string, comment?: string } {
    const [actualStreet, comment] = street.replace(")", "").trim().split("(")
    const actualStreetParts = actualStreet.split(/\s+/)
    const housenumberCandidates = actualStreetParts.filter(it => /\d+\w*/.test(it))
    const housenumber = housenumberCandidates[housenumberCandidates.length - 1]
    return {
        street: actualStreetParts.slice(0, actualStreetParts.indexOf(housenumber)).join(" "),
        housenumber,
        comment,
    }
}

function toInternationalPhone(localPhoneNumber: string, countryCode: number): string {
    let phone = localPhoneNumber.replace(/\(|\)/g, "") // remove parentheses
    if (phone.startsWith("0")) {
        phone = phone.replace("0", `+${countryCode} `) // replace leading zero
    } else if (!phone.startsWith("+")) {
        throw new Error(`Cannot handle phone number "${localPhoneNumber}".`)
    }
    const parts = phone.split(" ")
    return `${parts[0]} ${parts[1]} ${parts.slice(2).join("")}` // remove whitespace from last part
}

function getWebsite(location: NativeLocation): string | undefined {
    return (location.website && !isFacebookUrl(location.website)) ? location.website : undefined
}

function getFacebook(location: NativeLocation): string | undefined {
    return (location.website && isFacebookUrl(location.website)) ? location.website : undefined
}

function isFacebookUrl(url: string): boolean {
    const facebookUrlPrefixes = [
        "http://www.facebook.com",
        "https://www.facebook.com",
        "http://m.facebook.com",
        "https://m.facebook.com",
        "http://facebook.com",
        "https://facebook.com",
    ]
    return facebookUrlPrefixes.some(it => url.startsWith(it))
}

function getOpeningHours(location: NativeLocation): string {
    return [
        ["Mo", location.otMon],
        ["Tu", location.otTue],
        ["We", location.otWed],
        ["Th", location.otThu],
        ["Fr", location.otFri],
        ["Sa", location.otSat],
        ["Su", location.otSun],
    ]
        .map(([day, ot]) => ot ? `${day} ${ot.replace(/\s/g, "")}` : undefined)
        .filter(it => !!it)
        .join("; ")

}

function convertYesNoUnknown(value: YesNoUnknown): "yes" | "no" | undefined {
    switch (value) {
        case 1: return "yes"
        case 0: return "no"
        case -1: return undefined
    }
}

function getShop(l: NativeShoppingLocation): string | undefined {
    const shop = l.tags
        .map(it => {
            switch (it) {
                case "clothing": return "clothes"
                case "hairdressers": return "hairdresser"
                case "sports": return "sports"
                case "supermarket": return "supermarket"
                case "tattoostudio": return "tattoos"
                case "toiletries": return "chemist"
                default: return undefined
            }
        })
        .filter(it => !!it)
        .join(";")
    return shop ? shop : undefined
}
