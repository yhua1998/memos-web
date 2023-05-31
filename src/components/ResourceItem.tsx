import { File } from "lucide-react"

interface Props {
    resource: Resource,
    isList: boolean
}

export default ({ resource, isList }: Props) => {
    return (<>
        {
            isList ? (
                <div className=" py-[4px] grid grid-cols-[32px,32px,2fr,1fr,32px] justify-center items-center" >
                    <input className="" type="checkbox" />
                    <span className=" place-self-center">{resource.id}</span>
                    <span className="">{resource.filename}</span>
                    <span className="">{new Date(resource.updatedTs).toLocaleDateString()}</span>
                </div>
            ) : (
                <div className=" flex flex-col items-center p-4 rounded-2xl hover:bg-slate-200 ">
                    <input className=" self-start " type="checkbox" />
                    <File size={128} strokeWidth={0.1} />
                    <span className="">{resource.filename}</span>
                    <span className="">{new Date(resource.updatedTs).toLocaleDateString()}</span>
                    <span>{resource.publicId}</span>
                </div>
            )
        }
    </>)
}