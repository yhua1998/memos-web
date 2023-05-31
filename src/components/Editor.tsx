import React, { forwardRef, useImperativeHandle, useRef } from "react";

export interface EditorRefActions {
    getContent: () => string,
    setContent: (value: string) => void
}

interface Props {
    className?: string
}

export default forwardRef(({ className }: Props, ref: React.ForwardedRef<EditorRefActions>) => {

    const editorRef = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(
        ref,
        () => ({
            getContent: () => {
                return editorRef.current?.value ?? ""
            },
            setContent: (value: string) => {
                if (editorRef.current) {
                    editorRef.current.value = value
                }
            }
        })
    )

    return (
        <div className={className}>
            <textarea ref={editorRef} className=" bg-transparent m-0 w-full h-full resize-none outline-none overflow-x-hidden overflow-y-auto whitespace-pre-wrap word-break " title="" placeholder="记录点什么..." />
        </div>
    )
})