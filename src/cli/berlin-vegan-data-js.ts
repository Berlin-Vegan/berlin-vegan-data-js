#!/usr/bin/env node

/* tslint:disable: no-console */
import * as program from "commander"
import * as fs from "fs"

import { OsmJsonConverter } from "../main/conversion/open-street-map/OsmJsonConverter"
import { SchemaOrgConverter } from "../main/conversion/schema-org-json-ld/SchemaOrgConverter"
import { NativeLocation } from "../main/model/json/native/NativeLocation"
import { isGastroLocation } from "../main/Misc"
import { NativeGastroLocation } from "../main/model/json/native/NativeGastroLocation"
import { NativeShoppingLocation } from "../main/model/json/native/NativeShoppingLocation"
import { OverpassGeoJSONConverter } from "../main/conversion/open-street-map/OverpassGeoJSONConverter"
import { Config } from "../main/conversion/Config"
import * as packageJson from "../../package.json"
import * as DefaultConfig from "../main/conversion/default-config.json"
import * as axios from "axios"

program
    .usage("[options]")
    .option("-s, --schema [osm-json|overpass-geo-json|schema-org]", "Output schema")
    .option("-i, --in [string]", "Input file or URL (native .json file, UTF-8-encoded)")
    .option(
        "-c, --config [string]",
        "Configuration file (.json file, UTF-8-encoded) (default: berlin-vegan.com settings)"
    )
    .option(
        "-o, --out [string]",
        "Output file (converted .json file, UTF-8-encoded) (default depends on schema)"
    )
    .option("-f, --force", "Force overwriting of existing file")
    .option("--indent [integer]", "Output file indentation (0 for no formatting at all)", "2")
    .version(packageJson.version)
    .parse(process.argv);
(async () => {
    const config: Config = program.config ? JSON.parse(fs.readFileSync(program.config, "utf-8")) : DefaultConfig
    let converter
    switch (program.schema) {
        case "osm-json":
            converter = new OsmJsonConverter(config.osm, config.overpass)
            break
        case "overpass-geo-json":
            converter = new OverpassGeoJSONConverter(config.osm, config.overpass)
            break
        case "schema-org":
            converter = new SchemaOrgConverter(config)
            break
        default:
            console.error("ERROR: Invalid schema")
            console.log(program.helpInformation())
            process.exit(1)
    }
    const nativeLocations: NativeLocation[] = /^http(s)?:/.test(program.in) ?
        (await axios.default.get(program.in)).data
        :
        JSON.parse(fs.readFileSync(program.in, "utf-8"))
    const convertedLocations = isGastroLocation(nativeLocations[0]) ?
        converter.convertGastroLocations(nativeLocations as NativeGastroLocation[])
        :
        converter.convertShoppingLocations(nativeLocations as NativeShoppingLocation[])
    const indent = program.indent ? parseInt(program.indent, 10) : 0
    const output = indent > 0 ?
        JSON.stringify(convertedLocations, null, indent)
        :
        JSON.stringify(convertedLocations)
    const outFile =
        program.out ?? (isGastroLocation ? "gastro" : "shopping") + `-locations-${program.schema}.json`
    if (fs.existsSync(outFile) && !program.force) {
        console.error(`ERROR: File ${outFile} exists. Use --force to overwrite.`)
        process.exit(2)
    }
    fs.writeFileSync(outFile, output, { encoding: "utf-8" })
    console.log("Wrote to: " + outFile)
    process.exit()
})()
