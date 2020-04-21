import { OsmLocationTags } from "./OsmLocationTags"

export interface OsmShoppingLocationTags extends OsmLocationTags {

    /**
     * A semicolon-separated list of shops that apply to this location.
     *
     * Only the following values are used:
     * chemist, clothes, hairdresser, supermarket, tattoos"
     *
     * Mapping issues:
     *
     * - OSM strongly discourages listing multiple shops in favor of choosing a primary shop;
     *   see https://wiki.openstreetmap.org/wiki/Semi-colon_value_separator#When_NOT_to_use.
     *   However, our data does not indicate a primary shop, so in case a location has multiple shop
     *   values,  we only have the choice between listing all of them or omitting all of them, and so we choose
     *   to list all of them.
     * - We cannot map "foods" to any shop value because we have locations that should have shop:bakery or
     *   shop:alcohol, e.g., but we cannot determine which one it is.
     * - We cannot map "accommodation" to any shop value.
     *
     * https://wiki.openstreetmap.org/wiki/Key:shop
     */
    "shop"?: string

    /**
     * Used if the source data describes the location as an "accommodation".
     */
    "tourism"?: "yes"
}
