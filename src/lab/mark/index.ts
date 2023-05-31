import { unified } from 'unified'
import remarkParse from 'remark-parse'
// import remarkHtml from 'remark-html'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'

const markToHtml = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)

export const mark = async (markdown: string) => {
    return await markToHtml.process(markdown)
}