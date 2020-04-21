import { PostalAddress } from "./PostalAddress"
import { Review } from "./Review"
import { Thing } from "./Thing"

/**
 * https://schema.org/Organization
 */
export interface Organization extends Thing {
    address: PostalAddress
    email?: string
    review?: Review
    telephone?: string
}
