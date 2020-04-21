import { Organization } from "./Organization"
import { Place } from "./Place"

/**
 * https://schema.org/LocalBusiness
 */
export interface LocalBusiness extends Organization, Place {
    /**
     * The general opening hours for a business
     *
     * This property is populated by splitting data in the
     * [OpenStreetMap syntax](https://wiki.openstreetmap.org/wiki/Key:opening_hours) by semicolon.
     * In simple cases, i.e. most cases, this will produce valid values according to the schema.org
     * specification. However, this may produce invalid values sometimes when there are exceptions to the
     * general opening hours. The schema.org specification mandates use of the property
     * specialOpeningHoursSpecification for these cases. However, mapping the OpenStreetMap syntax to a
     * combination of openingHours and specialOpeningHoursSpecification would presumably be a large effort,
     * so we opt to violate the specification sometimes. This may not be too bad becaus there seems to be no
     * schmema.org-enabled validator that parses this property (not even the Google validator), and thus it
     * is likely that search engines will not parse it either. Even if they did - being search engines -
     * they would probably be well-equipped to handle invalid data.
     *
     * https://schema.org/openingHours
     */
    openingHours: string | string[]

    name: string
}
