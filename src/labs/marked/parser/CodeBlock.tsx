/**
 * 代码块解析
 */
import { matcher } from '../matcher'
import hljs from 'highlight.js'

export const CODE_BLOCK_REG = /^```(\S*?)\s([\s\S]*?)```/

const renderer = (rawStr: string) => {
    const matchResult = matcher(rawStr, CODE_BLOCK_REG)
    if (!matchResult) {
        return <>{rawStr}</>
    }
    const language = matchResult[1] || "plaintext"
    let highlightedCode = hljs.highlightAuto(matchResult[2]).value

    try {
        const temp = hljs.highlight(matchResult[2], {
            language
        }).value
        highlightedCode = temp
    } catch (error) { }

    const handleCopyButtonClick = () => {

    }

    return (
        <pre className='group'>
            <button className='text-xs font-mono italic absolute top-0 left-0 px-2 lleading-6 border btn-text rounded opacity-0 group-hover:opacity-60' onClick={handleCopyButtonClick}>
                ctrl+c
            </button>
            <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
    )
}

export default {
    name: "code block",
    regexp: CODE_BLOCK_REG,
    renderer
}