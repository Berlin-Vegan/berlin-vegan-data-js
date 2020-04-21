import { OsmLocationTags } from "./OsmLocationTags"

export interface OsmGastroLocationTags extends OsmLocationTags {

    /**
     * Describes if a location has one or more toilets which is accessible and usable for wheelchair users.
     *
     * Our definition of "yes" and "no" may in some cases violate the corresponding very specific
     * OSM definition. That means that in these cases, usage of "yes" and "no" may be technically incorrect.
     * However, we think that providing this slightly inaccurate value still provides more benefit than
     * omitting it.
     *
     * https://wiki.openstreetmap.org/wiki/Key:toilets:wheelchair
     */
    "toilets:wheelchair"?: "yes" | "no"

    /**
     * https://wiki.openstreetmap.org/wiki/Key:addr:district
     */
    "addr:district": string

    /**
     * Describes if dogs are allowed.
     *
     * https://wiki.openstreetmap.org/wiki/Key:dog
     */
    "dog"?: "yes" | "no"

    /**
     * Describes if a high chair is available.
     *
     * https://wiki.openstreetmap.org/wiki/Key:highchair
     */
    "highchair"?: "yes" | "no"

    /**
     * Catering is available.
     *
     * An undocumented key at the time of writing (April 2020).
     *
     * Note that there is an overlap with the OSM tag "craft:caterer", but that it cannot
     * express "catering:no".
     */
    "catering"?: "yes" | "no"

    /**
     * Number of seats outdoor.
     *
     * An undocumented key at the time of writing (April 2020).
     *
     * Note that keys [outdoor_seating](https://wiki.openstreetmap.org/wiki/Key:outdoor_seating) and
     * [capacity](https://wiki.openstreetmap.org/wiki/Key:capacity) exist.
     */
    "outdoor_seating:capacity"?: string

    /**
     * Number of seats indoor.
     *
     * An undocumented key at the time of writing (April 2020).
     *
     * Note that keys [indoor_seating](https://wiki.openstreetmap.org/wiki/Key:indoor_seating) and
     * [capacity](https://wiki.openstreetmap.org/wiki/Key:capacity) exist.
     */
    "indoor_seating:capacity"?: string

    /**
     * https://wiki.openstreetmap.org/wiki/Key:internet_access
     */
    "internet_access"?: "wlan"

    /**
     * https://wiki.openstreetmap.org/wiki/Key:internet_access
     */
    "internet_access:fee"?: "no"

    /**
     * Describes if this location offers a proper gluten-free option.
     *
     * diet:gluten_free:yes does not imply that diet:gluten_free:only is false, because our data source
     * does not discriminate between these values.
     *
     * https://wiki.openstreetmap.org/wiki/Key:diet
     */
    "diet:gluten_free"?: "yes" | "no"

    /**
     * https://wiki.openstreetmap.org/wiki/Key:breakfast
     */
    "breakfast"?: "yes" | "no"

    /**
     * Brunch is available.
     *
     * A proposed key at the time of writing (April 2020).
     * See https://wiki.openstreetmap.org/wiki/Key:breakfast.
     */
    "breakfast:brunch"?: "yes" | "no"

    /**
     * https://wiki.openstreetmap.org/wiki/Key:delivery
     */
    "delivery"?: "yes" | "no"

    /**
     * https://wiki.openstreetmap.org/wiki/Key:email
     */
    "email"?: string

    /**
     * A semicolon-separated list of amenities that apply to this location.
     *
     * Only the following amenities are used:
     * pub, cafe, ice_cream, fast_food, restaurant
     *
     * Mapping issues:
     *
     * - OSM strongly discourages listing multiple amenities in favor of choosing a primary amenity;
     *   see https://wiki.openstreetmap.org/wiki/Semi-colon_value_separator#When_NOT_to_use.
     *   However, our data does not indicate a primary amenity, so in case a location has multiple amenity
     *   values, we only have the choice between listing all of them or omitting all of them, and so we choose
     *   to  list all of them.
     * - We cannot distinguish between amenity:bar, amenity:pub and amenity:biergarten.
     *   We only have bar, which we map to amenity:pub, because this comes closest.
     *
     * https://wiki.openstreetmap.org/wiki/Key:amenity
     */
    "amenity": string

    //#region Optional redundant tags

    /**
     * Describes if catering service is offered. (optional redundant tag)
     *
     * https://wiki.openstreetmap.org/wiki/Key:craft
     */
    "craft"?: "caterer"

    /**
     * Describes if outdoor seating is available. (optional redundant tag)
     *
     * https://wiki.openstreetmap.org/wiki/Key:outdoor_seating
     */
    "outdoor_seating"?: "yes" | "no"

    /**
     * Describes if outdoor seating is available. (optional redundant tag)
     *
     * https://wiki.openstreetmap.org/wiki/Key:indoor_seating
     */
    "indoor_seating"?: "yes" | "no"

    /**
     * Brunch is available. (optional redundant tag)
     *
     * An undocumented alternative key for the proposed key "breakfast:brunch", which is used slightly more
     * often than "breakfast:brunch" at the time of writing (April 2020).
     */
    "brunch"?: "yes" | "no"

    /**
     * An alternative key for the email.
     *
     * https://wiki.openstreetmap.org/wiki/Key:contact
     */
    "contact:email"?: string

    //#endregion
}
