import { PostalAddress } from "./PostalAddress"
import { Review } from "./Review"
import { Thing } from "./Thing"

/**
 * https://schema.org/Place
 */
export interface Place extends Thing {
    address: PostalAddress
    latitude: number
    longitude: number
    review?: Review
    telephone?: string
}
