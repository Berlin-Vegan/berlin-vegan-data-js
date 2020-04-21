import { StructuredValue } from "./StructuredValue"

/**
 * https://schema.org/ContactPoint
 */
export interface ContactPoint extends StructuredValue {
    email?: string
    telephone: string
}
