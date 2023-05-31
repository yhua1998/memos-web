import { Hash, CheckSquare, ChevronsLeftRight, Paperclip, Maximize } from 'lucide-react'
import { useRef, useState } from 'react'
import Editor, { EditorRefActions } from './Editor'
import { toast } from 'react-hot-toast'
import { useEditor } from '@/store/editor'
import { useMemos } from '@/store/memo'

export default () => {

    const [
        editMemoId,
        memoVisibility,
        resourceList,
        relationList,
        setResourceList,
        setRelationList
    ] = useEditor((state) => [
        state.editMemoId,
        state.memoVisibility,
        state.resourceList,
        state.relationList,
        state.setResourceList,
        state.setRelationList
    ])
    const [createMemo] = useMemos((state) => [state.createMemo])

    const [state, setState] = useState({
        isRequesting: false
    })
    const editorRef = useRef<EditorRefActions>(null)

    const handleSaveBtnClick = async () => {
        if (state.isRequesting) return
        setState((state) => ({
            ...state,
            isRequesting: true
        }))
        const content = editorRef.current?.getContent() ?? ""
        try {
            if (editMemoId && editMemoId !== -1) { }
            else {
                await createMemo({
                    content,
                    visibility: memoVisibility,
                    resourceIdList: resourceList.map((r) => r.id),
                    relationList: relationList
                })
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
        setState((state) => ({
            ...state,
            isRequesting: false
        }))
        setResourceList([])
        setRelationList([])
        editorRef.current?.setContent("")
    }

    return (
        <div className=' shadow p-2 rounded'>
            <Editor className=' w-full h-full' ref={editorRef} />
            <div className=' flex gap-1'>
                <div className=' cursor-pointer hover:bg-slate-300 rounded p-1'><Hash size={20} /></div>
                <div className=' cursor-pointer hover:bg-slate-300 rounded p-1'><CheckSquare size={20} /></div>
                <div className=' cursor-pointer hover:bg-slate-300 rounded p-1'><ChevronsLeftRight size={20} /></div>
                <div className=' cursor-pointer hover:bg-slate-300 rounded p-1'><Paperclip size={20} /></div>
                <div className=' cursor-pointer hover:bg-slate-300 rounded p-1'><Maximize size={20} /></div>
            </div>
            <div className=' flex justify-end'>
                <div onClick={handleSaveBtnClick} className=' cursor-pointer select-none px-2 py-1 bg-green-500 rounded text-white'>MEMO</div>
            </div>
        </div>
    )
}