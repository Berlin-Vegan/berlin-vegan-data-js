import { Thing } from "./Thing"

export type JsonLd<T extends Thing> = T & {
    "@context": "http://schema.org",
    "@type": string | string[],
}
