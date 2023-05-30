import AddResource from '@/components/AddResource'
import ResourceCard from '@/components/ResourceCard'
import ResourceList from '@/components/ResourceList'
import useLoading from '@/hooks/useLoading'
import { useResources } from '@/store/resource'
import { Paperclip, Search, LayoutList, LayoutGrid, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default () => {

    const [resources, fetchResourceListWithLimit] = useResources((state) => [
        state.resources,
        state.fetchResourceListWithLimit
    ])

    const [isList, setIsList] = useState(false)
    const [showAddResource, setShowAddResource] = useState(true)
    const [isComplete, setIsComplete] = useState(false)
    const loadingState = useLoading()

    useEffect(() => {
        fetchResourceListWithLimit(20).then((fetchedResource) => {
            if (fetchedResource.length < 20) {
                setIsComplete(true)
            }
            loadingState.setFinish()
        }).catch((error: any) => {
            toast.error(error.response.data.message || "请求资源列表失败")
        })
    }, [])


    return (
        <div className=" bg-slate-50  rounded-lg p-2 pb-16">
            <div className=' flex justify-between items-center'>
                <div className=' flex items-center gap-2'><Paperclip /><span>Resource</span></div>
                <div className=' text-slate-400 bg-slate-200 flex rounded-lg'>
                    <Search className='m-2' />
                    <input className=' bg-transparent outline-none ' placeholder='javascript' />
                </div>
            </div>
            <div className='mt-2 flex gap-2 justify-end '>
                <div className=' bg-blue-500 cursor-pointer border-[1px] rounded-lg text-slate-50'>
                    <Plus onClick={() => setShowAddResource(!showAddResource)} size={32} />
                </div>
                {/* <div className=' cursor-pointer border-[1px] rounded-lg text-gray-500'>
                    <MoreVertical size={32} />
                </div> */}
                <div className=' flex border-[1px] rounded-lg text-gray-500'>
                    <LayoutList size={32} onClick={() => setIsList(true)} className={` ${isList && ' bg-slate-200'} p-[2px] cursor-pointer`} />
                    <LayoutGrid size={32} onClick={() => setIsList(false)} className={` ${!isList && ' bg-slate-200'} p-[2px] cursor-pointer`} />
                </div>
            </div>
            <div>
                {showAddResource && <AddResource />}

                <div className=' mt-4'>

                    {isList ? <ResourceList resources={resources} /> : <ResourceCard resources={resources} />}

                    {isComplete && <div className=' text-center text-slate-400'>Already bottomed out</div>}
                </div>
            </div>
        </div>
    )
}