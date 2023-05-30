import ResourceItem from "./ResourceItem"

interface Props {
    resources: Resource[]
}

export default ({ resources }: Props) => {
    return (
        <div>
            <div className=" py-2 border-y-[1px] grid grid-cols-[32px,32px,2fr,1fr,32px] justify-center items-center">
                <input className="" type="checkbox" />
                <span className=" place-self-center">ID</span>
                <span className="">Name</span>
                <span className="">Date</span>
            </div>
            {resources.length >= 1 && resources.map(resource => <ResourceItem isList={true} key={'res-' + resource.id} resource={resource} />)}
        </div>
    )
}