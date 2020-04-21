export interface Config {
    osm: OsmConfig
    overpass: OverpassConfig
    schemaOrg: SchemaOrgConfig
}

export interface OsmConfig {

    /**
     * The organization's base URL including a trailing slash.
     *
     * E.g. "https://www.berlin-vegan.de/"
     */
    organizationBaseUrl: string

    /**
     * Data about locations that is not in the database but is needed for the OpenStreetMap target data format
     */
    locationData: {

        /**
         * The 2-letter country code
         *
         * E.g. "DE"
         */
        addressCountryCode: string

        /**
         * The phone country code
         *
         * E.g. 49
         */
        phoneCountryCode: number
    }

    inferRedundantTags: boolean
}

export interface OverpassConfig {

    /**
     * The data copyright
     */
    copyright: string

    /**
     * The data license
     */
    license?: string

    placeholders: {
        /**
         * OpenStreetMap node id.
         *
         * There is no OSM node id in the database yet.
         */
        nodeId: number
        /**
         * Timestamp in ISO format
         *
         * There is no timestamp in the source JSON yet.
         */
        timestamp: string
    }
}

export interface SchemaOrgConfig {
    includeReviewText: boolean
}
