import { matcher } from "../matcher";

export const STRINKETTHROUGH_REG = /~~(.+?)~~/

const renderer = (rawStr: string) => {
    const matchResult = matcher(rawStr, STRINKETTHROUGH_REG)
    if (!matchResult) {
        return rawStr
    }

    return <del>{matchResult[1]}</del>
}

export default {
    name: "strikethrough",
    regexp: STRINKETTHROUGH_REG,
    renderer
}