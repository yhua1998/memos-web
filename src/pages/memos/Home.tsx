import MemoEditor from "@/components/MemoEditor"
import MemoList from "@/components/MemoList"

export default () => {
    return (
        <div className=" bg-slate-50 rounded-lg p-2">
            <MemoEditor />
            <div className=" mt-4 ">
                <MemoList />
            </div>
        </div>
    )
}