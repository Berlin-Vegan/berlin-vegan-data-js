import { OsmGastroLocationTags } from "../../model/json/open-street-map/OsmGastroLocationTags"
import { OsmLocationTags } from "../../model/json/open-street-map/OsmLocationTags"
import { OsmShoppingLocationTags } from "../../model/json/open-street-map/OsmShoppingLocationTags"

export function inferRedundantGastroLocationTags(tags: OsmGastroLocationTags): OsmGastroLocationTags {
    return {
        ...tags,
        ...inferRedundantLocationTagsPlus(tags),
        "craft": tags.catering ? "caterer" : undefined,
        "outdoor_seating": tags["outdoor_seating:capacity"] ? "yes" : "no",
        "indoor_seating": tags["indoor_seating:capacity"] ? "yes" : "no",
        "brunch": tags["breakfast:brunch"],
        "contact:email": tags.email,
    }
}

export function inferRedundantShoppingLocationTags(tags: OsmShoppingLocationTags): OsmShoppingLocationTags {
    return {
        ...tags,
        ...inferRedundantLocationTagsPlus(tags),
    }
}

function inferRedundantLocationTagsPlus(tags: OsmLocationTags): OsmLocationTags {
    return {
        ...tags,
        "contact:phone": tags.phone,
        "contact:website": tags.website,
        "contact:facebook": tags.facebook,
    }
}
