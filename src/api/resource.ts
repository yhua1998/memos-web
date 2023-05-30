import axios from 'axios'

export function getResourceListWithLimit(resourceFind?: ResourceFind) {
    const queryList = [];
    if (resourceFind?.offset) {
        queryList.push(`offset=${resourceFind.offset}`);
    }
    if (resourceFind?.limit) {
        queryList.push(`limit=${resourceFind.limit}`);
    }
    return axios.get<ResponseObject<Resource[]>>(`/api/resource?${queryList.join("&")}`);
}

export function createResourceWithBlob(formData: FormData) {
    return axios.post<ResponseObject<Resource>>("/api/resource/blob", formData);
}