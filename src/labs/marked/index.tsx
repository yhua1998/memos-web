import { matcher } from "./matcher";
import { blockElementParserList, inlineElementParserList } from "./parser";

type Parser = {
    name: string,
    regexp: RegExp,
    renderer: (rawStr: string) => JSX.Element | string
}

const findMatchingParser = (parsers: Parser[], markdownStr: string) => {
    let matchedParser = undefined
    let matchedIndex = -1

    for (const parser of parsers) {
        const matchResult = matcher(markdownStr, parser.regexp)
        if (!matchResult) {
            continue
        }
        if (parser.name === "plain text" && matchedParser !== undefined) {
            continue
        }

        const startIndex = matchResult.index as number
        if (matchedParser === undefined || matchedIndex > startIndex) {
            matchedParser = parser
            matchedIndex = startIndex
        }
    }
    return matchedParser
}


export const marked = (
    markdownStr: string,
    blockParsers = blockElementParserList,
    inlineParsers = inlineElementParserList
): string | JSX.Element => {
    const matchedBlockParser = findMatchingParser(blockParsers, markdownStr)
    if (matchedBlockParser) {
        const matchResult = matcher(markdownStr, matchedBlockParser.regexp)
        if (matchResult) {
            const matchedStr = matchResult[0]
            const retainContent = markdownStr.slice(matchedStr.length)
            if (matchedBlockParser.name === "br") {
                return (
                    <>
                        {matchedBlockParser.renderer(matchedStr)}
                        {marked(retainContent, blockParsers, inlineParsers)}
                    </>
                )
            } else {
                if (retainContent === "") {
                    return matchedBlockParser.renderer(matchedStr)
                } else if (retainContent.startsWith("\n")) {
                    return (
                        <>
                            {matchedBlockParser.renderer(matchedStr)}
                            {marked(retainContent.slice(1), blockParsers, inlineParsers)}
                        </>
                    )
                }
            }
        }

    }

    const matchedInlineParser = findMatchingParser(inlineParsers, markdownStr)
    if (matchedInlineParser) {
        const matchResult = matcher(markdownStr, matchedInlineParser.regexp)
        if (matchResult) {
            const matchedStr = matchResult[0]
            const matchedLength = matchedStr.length
            const mIndex = matchResult.index || 0
            const prefixStr = markdownStr.slice(0, mIndex)
            const suffixStr = markdownStr.slice(mIndex + matchedLength)
            return (
                <>
                    {marked(prefixStr, [], inlineParsers)}
                    {matchedInlineParser.renderer(matchedStr)}
                    {marked(suffixStr, [], inlineParsers)}
                </>
            )
        }
    }
    return <>{markdownStr}</>
}

interface MatchedNode {
    parserName: string,
    matchedContent: string
}

export const getMatchedNodes = (_markdownStr: string): MatchedNode[] => {
    const matchedNodeList: MatchedNode[] = []

    return matchedNodeList
}