import { useEffect, useState } from "react";
import { mark as marked } from '@/lab/mark'
export default function (content: string) {
    const [mark, setMark] = useState("")
    useEffect(() => {
        marked(content.replaceAll('\n', '\n\n').replaceAll('|\n', '|')).then((v) => {
            setMark(String(v))
        })
    }, [content])
    return mark
}