import { OsmLocationCustomTags } from "./OsmLocationCustomTags"

export interface OsmShoppingLocationCustomTags extends OsmLocationCustomTags {

    /**
     * Tags.
     * 1 to 8 items.
     *
     * Not that there is an overlap with the OSM keys "shop" and "tourism".
     */
    "custom:tags": (
        "foods"
        | "clothing"
        | "toiletries"
        | "supermarket"
        | "hairdressers"
        | "sports"
        | "tattoostudio"
        | "accommodation"
    )[]
}
