import { MoreVertical } from 'lucide-react'
import { getPublicTime } from '@/utils/datetime'
import useMark from '@/hooks/useMark'

interface Props {
    memo: Memo,
    handleMemoClick: (e: React.MouseEvent) => void
}

export default ({ memo, handleMemoClick }: Props) => {

    const marktext = useMark(memo.content)

    return (
        <div className=" cursor-pointer p-2 shadow rounded hover:shadow-xl ">
            <div className=' flex justify-between my-2 '>
                {/* top */}
                <div className=" flex text-slate-600 text-sm gap-4 ">
                    <span >{getPublicTime(memo.createdTs)}</span>
                    <span>@{memo.creatorName}</span>
                </div>
                <div>
                    <MoreVertical className=' cursor-pointer text-slate-600 text-sm ' size={16} />
                </div>
            </div>
            <div onClick={e => handleMemoClick(e)} className='mark' dangerouslySetInnerHTML={{ __html: marktext }} >

            </div>
        </div>
    )
}