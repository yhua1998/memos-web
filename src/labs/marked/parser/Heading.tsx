import { marked } from "..";
import { matcher } from "../matcher";
import Link from './Link'
import PlainLink from "./PlainLink";
import PlainText from "./PlainText";

export const HEADING_REG = /^(#+) ([^\n]+)/

const renderer = (rawStr: string) => {
    const matchResult = matcher(rawStr, HEADING_REG)
    if (!matchResult) {
        return rawStr
    }
    const level = matchResult[1].length
    const parsedContent = marked(matchResult[2], [], [Link, PlainLink, PlainText])

    switch (level) {
        case 1:
            return <h1>{parsedContent}</h1>
        case 2:
            return <h2>{parsedContent}</h2>
        case 3:
            return <h3>{parsedContent}</h3>
        case 4:
            return <h4>{parsedContent}</h4>
        case 5:
            return <h5>{parsedContent}</h5>
        default:
            return <h6>{parsedContent}</h6>
    }
}

export default {
    name: "heading",
    regexp: HEADING_REG,
    renderer
}