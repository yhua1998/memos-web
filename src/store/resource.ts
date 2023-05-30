import { create } from 'zustand'
import * as api from '@/api'

const convertResponseModelResource = (resource: Resource): Resource => {
    return {
        ...resource,
        createdTs: resource.createdTs * 1000,
        updatedTs: resource.updatedTs * 1000,
    };
}

interface ResourceState {
    resources: Resource[]
}

interface ResourceActions {
    setResources: (resources: Resource[]) => void;
    fetchResourceListWithLimit: (limit: number, offset?: number) => Promise<Resource[]>;
    createResourceWithBlob: (file: File) => Promise<Resource>
}

export const useResources = create<ResourceState & ResourceActions>((set) => ({
    resources: [] as Resource[],
    setResources: (resources: Resource[]) => set({ resources: resources }),
    fetchResourceListWithLimit: async (limit: number = 10, offset?: number) => {
        const resourceFind: ResourceFind = {
            limit,
            offset
        }
        const { data } = (await api.getResourceListWithLimit(resourceFind)).data
        const resourceList = data.map((m) => convertResponseModelResource(m))
        set(() => ({ resources: resourceList }))
        return resourceList
    },
    createResourceWithBlob: async (file: File) => {
        const { name: filename} = file
        const formData = new FormData()
        formData.append("file", file, filename)
        const { data } = (await api.createResourceWithBlob(formData)).data
        const resource = convertResponseModelResource(data)
        set((state) => ({ resources: [resource, ...state.resources]}))
        return resource
    }
}))