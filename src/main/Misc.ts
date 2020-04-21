import { NativeLocation } from "./model/json/native/NativeLocation"

const gastroTags = ["Bar", "Cafe", "Eiscafe", "Imbiss", "Restaurant"]
const shoppingTags = [
    "foods",
    "clothing",
    "toiletries",
    "supermarket",
    "hairdressers",
    "sports",
    "tattoostudio",
    "accommodation",
]

export function isGastroLocation(location: NativeLocation): boolean {
    const tags: string[] = (location as any).tags
    if (tags.some(it => gastroTags.includes(it))) {
        return true
    } else if (tags.some(it => shoppingTags.includes(it))) {
        return false
    } else {
        throw new Error("Cannot determine type of location.")
    }
}
