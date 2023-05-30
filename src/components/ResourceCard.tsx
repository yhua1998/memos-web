import ResourceItem from "./ResourceItem"

interface Props {
    resources: Resource[]
}

export default ({ resources }: Props) => {
    return (
        <div className=" flex flex-wrap">
            {resources.length >= 1 && resources.map(resource => <ResourceItem isList={false} key={'res-' + resource.id} resource={resource} />)}
        </div>
    )
}