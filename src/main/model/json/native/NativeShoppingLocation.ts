import { NativeLocation } from "./NativeLocation"

export interface NativeShoppingLocation extends NativeLocation {

    /**
     * Tags describing the type of the location
     *
     * 1 to 8 items.
     */
    tags: (
        "foods"
        | "clothing"
        | "toiletries"
        | "supermarket"
        | "hairdressers"
        | "sports" // Includes gyms
        | "tattoostudio"
        | "accommodation"
    )[]
}
