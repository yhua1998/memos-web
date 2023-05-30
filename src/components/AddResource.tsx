import addResourceIcon from '@/assets/upload.svg'
import { useResources } from '@/store/resource'
import { useRef } from 'react'
import { toast } from 'react-hot-toast'

export default () => {

    const uploadRef = useRef<HTMLInputElement>(null)
    const [createResourceWithBlob] = useResources((state) => [state.createResourceWithBlob])

    const handleInputChange = async () => {
        try {
            const uploadFiles = uploadRef.current?.files
            if (uploadFiles && uploadFiles.length) {
                const uploadFile = uploadFiles[0]
                const resource = await createResourceWithBlob(uploadFile)
                toast.success(`资源添加成功: ${resource.filename}`)
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className=' m-8 p-16 rounded-lg border-[1px] border-dashed relative flex flex-col justify-center items-center '>
            <img className=' w-16 h-16 ' src={addResourceIcon} />
            <span className=' mt-2 '>Click or drag file to this area to upload</span>
            <span className=' mt-2 text-center text-slate-400 '>Suppert for a single file or bulk upload. Strictly prohibited from uploading company data or other banned files.</span>
            <input ref={uploadRef} onChange={handleInputChange} className=" cursor-pointer absolute top-0 left-0 w-full h-full bg-transparent opacity-0 " alt="" title="" type="file" />
        </div>
    )
}