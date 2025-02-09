import { NativeLocation } from "./NativeLocation"
import { YesNoUnknown } from "./YesNoUnknown"

export interface NativeGastroLocation extends NativeLocation {

    /**
     * Address: district
     *
     * Non-empty
     */
    district: string


    /**
     * Public transport description
     *
     * Non-empty
     */
    publicTransport?: string

    /**
     * WC/toilet is wheelchair-accessible.
     */
    handicappedAccessibleWc: YesNoUnknown

    /**
     * Dogs are allowed.
     */
    dog: YesNoUnknown

    /**
     * Child chair (high chair) is available.
     */
    childChair: YesNoUnknown

    /**
     * Catering service is offered.
     */
    catering: YesNoUnknown

    /**
     * Number of seats outdoor, or -1 = unknown
     */
    seatsOutdoor: number

    /**
     * Number of seats indoor, or -1 = unknown
     */
    seatsIndoor: number

    /**
     * Free WLAN (WiFi) is available,
     */
    wlan: YesNoUnknown

    /**
     * Gluten-free food is available.
     */
    glutenFree: YesNoUnknown

    /**
     * Breakfast is available.
     */
    breakfast: YesNoUnknown

    /**
     * Brunch is available.
     */
    brunch: YesNoUnknown

    /**
     * Delivery service is available.
     *
     * Can be an online shop or ordering by phone.
     */
    delivery: YesNoUnknown

    /**
     * Tags describing the type of the location
     *
     * 1 to 5 items
     */
    tags: ("Bar" | "Cafe" | "Eiscafe" | "Imbiss" | "Restaurant")[]

    /**
     * Email address
     *
     * Non-empty
     */
    email?: string
}

