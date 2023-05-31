import { useMemos } from "@/store/memo"
import MemoItem from "./MemoItem"
import { useEffect } from "react"
import { showImgPreViewDialog } from "./Dialog"

export default () => {

    const [memos, fetchMemos] = useMemos((state) => [
        state.memos,
        state.fetchMemos
    ])

    useEffect(() => {
        fetchMemos()
    }, [])

    const handleMemoClick = (e: React.MouseEvent) => {
        //@ts-ignore
        const tagName = e.target.tagName
        switch (tagName) {
            case 'IMG':
                //@ts-ignore
                showImgPreViewDialog(e.target.src)
                break
            default:

        }

    }

    return (
        <div className=" py-4 flex flex-col gap-4">
            {memos.length >= 1 && memos.map((memo) => <MemoItem handleMemoClick={handleMemoClick} memo={memo} key={'memo-' + memo.id} />)}
        </div>
    )
}