import { MoreVertical } from 'lucide-react'
import { mark } from '@/lab/mark'
import React, { useEffect, useState } from 'react'

interface Props {
    memo: Memo,
    handleMemoClick: (e:React.MouseEvent) => void
}

export default ({ memo, handleMemoClick }: Props) => {

    const [html, setHtml] = useState("")

    useEffect(() => {
        mark(memo.content.replaceAll('\n', '\n\n').replaceAll('|\n','|')).then((v) => {
            setHtml(String(v))
        })
    }, [])

    return (
        <div className=" cursor-pointer p-2 shadow rounded hover:shadow-xl ">
            <div className=' flex justify-between my-2 '>
                {/* top */}
                <div className=" text-slate-600 text-sm ">
                    <span >2 hour age</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;{memo.creatorName}</span>
                </div>
                <div>
                    <MoreVertical className=' cursor-pointer text-slate-600 text-sm ' size={16} />
                </div>
            </div>
            <div onClick={e=>handleMemoClick(e)} className='mark' dangerouslySetInnerHTML={{ __html: html }} >

            </div>
        </div>
    )
}