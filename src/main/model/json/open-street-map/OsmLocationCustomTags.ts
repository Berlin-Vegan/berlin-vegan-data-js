export interface OsmLocationCustomTags {

    /**
     * Unique identifier (across the organisation in charge).
     * Non-Empty.
     */
    "custom:id": string

    /**
     * The creation date of this record in format "YYYY-MM-DD" (UTC).
     *
     * I.e., this is not the date when the actual location was created/opened,
     * but rather the date when this record was created in the database.
     */
    "custom:date_created"?: string

    /**
     * Review by the organisation in charge.
     * Non-empty.
     */
    "custom:review:text"?: string

    /**
     * Full URL of a review by the organisation in charge.
     * Non-empty.
     */
    "custom:review:url"?: string
}
