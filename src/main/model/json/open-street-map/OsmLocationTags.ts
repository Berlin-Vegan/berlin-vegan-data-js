/**
 * A location represented by OpenStreetMap keys.
 *
 * Each property key is an OSM key as defined in:
 *
 * - https://wiki.openstreetmap.org/wiki/Category:Keys
 * - https://wiki.openstreetmap.org/wiki/Category:Key_descriptions
 *
 * The definitions used here may in some cases be stricter than defined by OSM.
 *
 * Examples:
 *
 * - While OSM tags are all optional we have many mandatory properties, e.g. "name."
 * - The definition of key "facebook" states that in "most cases, the full URL is used as value", while
 *   we will always use the full URL.
 *
 * Some properties are marked as "optional redundant tag". The configuration determines whether these
 * properties will be set or not. Of course, depending on the data, they can still be undefined even if
 * your configuration prescribes to set them.
 */
export interface OsmLocationTags {

    /**
     * https://wiki.openstreetmap.org/wiki/Key:name
     */
    "name": string

    /**
     * https://wiki.openstreetmap.org/wiki/Key:addr
     */
    "addr:street": string

    /**
     * https://wiki.openstreetmap.org/wiki/Key:addr
     */
    "addr:housenumber"?: string

    /**
     * https://wiki.openstreetmap.org/wiki/Key:addr
     */
    "addr:postcode": string

    /**
     * https://wiki.openstreetmap.org/wiki/Key:addr
     */
    "addr:city": string

    /**
     * The ISO 3166-1 alpha-2 two letter country code in upper case.
     *
     * Example: "DE" for Germany
     *
     * https://wiki.openstreetmap.org/wiki/Key:addr
     */
    "addr:country": string

    /**
     * A comment in local language regarding the locations's address.
     *
     * Non-empty.
     */
    "addr:comment"?: string

    /**
     * The phone number in international (ITU-T E.164) format
     *
     * Format:
     * +<country code> <area code> <local number>
     *
     * https://wiki.openstreetmap.org/wiki/Key:phone
     */
    "phone"?: string

    /**
     * The full URL to the official website.
     *
     * Pages on social media are fundamentally not websites. For Facebook, "contact:facebook" is used.
     *
     * https://wiki.openstreetmap.org/wiki/Key:website
     */
    "website"?: string

    /**
     * The full URL to the official Facebook page.
     *
     * https://wiki.openstreetmap.org/wiki/Key:facebook
     */
    "facebook"?: string

    /**
     * The locatios's opening hours as specified in https://wiki.openstreetmap.org/wiki/Key:opening_hours.
     *
     * OSM does not specify localization for the comment. We will use the prefix "en: " (without quotes)
     * for the English language. Otherwise the local language is used.
     *
     * https://wiki.openstreetmap.org/wiki/Key:opening_hours
     */
    "opening_hours": string

    /**
     * A comment in local language about opening_hours which cannot be expressed as a comment inside
     * opening_hours.
     *
     * Non-empty.
     */
    "opening_hours:comment"?: string

    /**
     * A comment in English about opening_hours which cannot be expressed as a comment inside
     * opening_hours.
     *
     * Non-empty.
     */
    "opening_hours:comment:en"?: string

    /**
     * Describes if an establishment offers vegan products.
     *
     * We use a more strict definition tha OSM:
     * - Value "only" is used in the sense of 100% vegan.
     * - Both "only" and "yes" require declaration of vegan status.
     *
     * https://wiki.openstreetmap.org/wiki/Key:diet:vegan
     */
    "diet:vegan": "only" | "yes"

    /**
     * Describes if a shop or restaurant offers vegetarian products.
     *
     * - diet:vegan=yes implies diet:vegetarian=yes.
     * - diet:vegan=only implies diet:vegetarian=only.
     *
     * https://wiki.openstreetmap.org/wiki/Key:diet:vegetarian
     */
    "diet:vegetarian": "only" | "yes"

    /**
     * Additional information about the location in the local language.
     *
     * https://wiki.openstreetmap.org/wiki/Key:description
     */
    "description"?: string

    /**
     * Additional information about the location in English.
     *
     * https://wiki.openstreetmap.org/wiki/Key:description
     */
    "description:en"?: string

    /**
     * Describes if the location offers organic products.
     *
     * The source data does not discriminate between organic:only and organic:yes,
     * so we can only use organic:yes even if worganic:only may be applicable in some cases.
     *
     * https://wiki.openstreetmap.org/wiki/Key:organic
     */
    "organic"?: "yes" | "no"

    /**
     * Wheelchair accessibility of the location.
     *
     * The source data does not discriminate between wheelchair:yes and wheelchair:limited,
     * so we can only use wheelchair:limited even if wheelchair:yes may be applicable in some cases.
     *
     * https://wiki.openstreetmap.org/wiki/Key:wheelchair
     */
    "wheelchair"?: "limited" | "no"

    //#region Optional redundant tags

    /**
     * An alternative key for the phone number. (optional redundant tag)
     *
     * Same format as "phone".
     *
     * https://wiki.openstreetmap.org/wiki/Key:contact
     */
    "contact:phone"?: string

    /**
     * An alternative key for the website. (optional redundant tag)
     *
     * https://wiki.openstreetmap.org/wiki/Key:contact
     */
    "contact:website"?: string

    /**
     * An alternative key for the Facebook page. (optional redundant tag)
     *
     * https://wiki.openstreetmap.org/wiki/Key:contact:facebook
     */
    "contact:facebook"?: string

    //#endregion
}
