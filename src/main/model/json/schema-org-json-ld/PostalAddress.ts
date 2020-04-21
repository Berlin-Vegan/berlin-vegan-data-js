import { StructuredValue } from "./StructuredValue"

/**
 * https://schema.org/PostalAddress
 */
export interface PostalAddress extends StructuredValue {
    addressCountry: string
    streetAddress: string
    postalCode: string
}
