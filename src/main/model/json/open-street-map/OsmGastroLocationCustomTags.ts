import { OsmLocationCustomTags } from "./OsmLocationCustomTags"

interface Image {

    /**
     * URL.
     * Non-empty.
     */
    url: string

    width: number

    height: number
}

export interface OsmGastroLocationCustomTags extends OsmLocationCustomTags {

    /**
     * Images.
     *
     * 0 to many items.
     *
     * Since 1) we generally use multiple images and 2) the licenses may not be open source,
     * we cannot use the key [image](https://wiki.openstreetmap.org/wiki/Key%3Aimage).
     */
    "custom:images": Image[]

    /**
     * Public transport description.
     *
     * Non-empty.
     *
     */
    "custom:public_transport"?: string

    /**
     * Free WLAN (WiFi) is available.
     *
     * Note that there is an overlap with the OSM tag "internet_access:wlan" and "internet_access:fee:no",
     * but "custom:free_wlan:no" could be due to "internet_access:no" or internet_access:fee:yes",
     * so we cannot map "custom:free_wlan:no" to anything but omission of both official keys.
     */
    "custom:free_wlan"?: "yes" | "no"
}
