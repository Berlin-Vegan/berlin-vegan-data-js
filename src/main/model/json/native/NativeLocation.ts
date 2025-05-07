import { YesNoUnknown } from "./YesNoUnknown"

export interface NativeLocation {

    /**
     * Identifier
     *
     * - Unique across all instances
     * - Non-Empty
     * - Not guaranteed to be stable between multiple versions of the JSON file
     */
    id: string

    /**
     * The creation date of this record in format "YYYY-MM-DD" (UTC).
     *
     * I.e., this is not the date when the actual location was created/opened,
     * but rather the date when this record was created in the database.
     *
     * It is currently (April 2020) optional because:
     *
     * - Due to a server bug, it is missing. The property "created" holds the value.
     * - It is missing in all ShoppingLocations. Still, NativeLocation is the
     *   correct place to define it, because in the future, all instances will have it.
     *
     * Until "created" is removed, applications must prepare for either "dateCreated" or "created" to hold
     * the value. E.g.: `const value = created ?? dateCreated;`
     */
    // TODO: Update docs when bug has been fixed.
    dateCreated?: string

    /**
     * @deprecated See "dateCreated".
     */
    // TODO: Remove when bug has been fixed.
    created?: string

    /**
     * Name
     *
     * Non-empty
     */
    name: string

    /**
     * Address: street, street number and optional comment
     *
     * Possible formats:
     * - <street> <street number>
     * - <street> <street number> (<comment>)
     *
     * Non-empty
     */
    street: string

    /**
     * Address: postcode (aka zip code)
     */
    cityCode: number

    /**
     * Address: city
     *
     * Non-empty
     */
    city: string

    /**
     * Address: latitude
     */
    latCoord: number

    /**
     * Address: longitude
     */
    longCoord: number

    /**
     * Telephone number
     *
     * Possible formats:
     * - (0<area code>) <local number>
     * - 0<area code> <local number>
     */
    telephone?: string

    /**
     * Website URL
     *
     * Non-empty
     */
    website?: string

    /**
     * Opening/closing times on Mondays
     *
     * - Possibly empty (i.e. closed that day).
     * - Examples: 11:00 - 18:30, 11:00 - 18:30, 00:00 - 00:00
     *
     * In the future, the ot* properties will be replaced by "openingTimes" with OpenStreetMaps syntax.
     */
    otMon: string

    /**
     * Opening/closing times on Tuesdays
     * See otMon.
     */
    otTue: string

    /**
     * Opening/closing times on Wednesdays
     * See otMon.
     */
    otWed: string

    /**
     * Opening/closing times on Thursdays
     * See otMon.
     */
    otThu: string

    /**
     * Opening/closing times on Fridays
     * See otMon.
     */
    otFri: string

    /**
     * Opening/closing times on Saturdays
     * See otMon.
     */
    otSat: string

    /**
     * Opening/closing times on Sundays
     * See otMon.
     */
    otSun: string

    /**
     * Opening/closing times comment (local language)
     *
     * Possibly empty
     */
    openComment?: string

    /**
     * Opening/closing times comment (English)
     *
     * Possibly empty
     */
    openCommentEnglish?: string

    /**
     * Vegan category code
     *
     * - 2 = omnivore (vegan declared),
     * - 4 = vegetarian (vegan declared),
     * - 5 = 100% vegan
     */
    vegan: 2 | 4 | 5

    /**
     * Description (local language)
     *
     * Non-empty
     */
    comment?: string

    /**
     * Description (English)
     *
     * Non-empty
     */
    commentEnglish?: string

    /**
     * The location offers mostly organic food.
     */
    organic: YesNoUnknown

    /**
     * The location is handicapped accessible.
     */
    handicappedAccessible: YesNoUnknown

    /**
     * Review by the organization in charge
     *
     * Non-empty
     */
    review?: string

    /**
     * URL of a review by the organization in charge, relative to the organization's review base URL
     *
     * Non-empty
     */
    reviewURL?: string

    /**
     * Pictures
     *
     * 0 to many items
     */
    pictures: Picture[]
}
export interface Picture {

    /**
     * URL
     *
     * Non-empty
     */
    url: string

    width: number

    height: number
}

