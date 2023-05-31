import axios from "axios";

export function createMemo(memoCreate: MemoCreate) {
    return axios.post<ResponseObject<Memo>>("/api/memo", memoCreate);
}

export function patchMemo(memoPatch: MemoPatch) {
    return axios.patch<ResponseObject<Memo>>(`/api/memo/${memoPatch.id}`, memoPatch);
}

export function deleteMemo(memoId: MemoId) {
    return axios.delete(`/api/memo/${memoId}`);
}

export function unpinMemo(memoId: MemoId) {
    return axios.post(`/api/memo/${memoId}/organizer`, {
        pinned: false,
    });
}

export function pinMemo(memoId: MemoId) {
    return axios.post(`/api/memo/${memoId}/organizer`, {
        pinned: true,
    });
}

export function getMemoList(memoFind?: MemoFind) {
    const queryList = [];
    if (memoFind?.creatorId) {
        queryList.push(`creatorId=${memoFind.creatorId}`);
    }
    if (memoFind?.rowStatus) {
        queryList.push(`rowStatus=${memoFind.rowStatus}`);
    }
    if (memoFind?.pinned) {
        queryList.push(`pinned=${memoFind.pinned}`);
    }
    if (memoFind?.offset) {
        queryList.push(`offset=${memoFind.offset}`);
    }
    if (memoFind?.limit) {
        queryList.push(`limit=${memoFind.limit}`);
    }
    return axios.get<ResponseObject<Memo[]>>(`/api/memo?${queryList.join("&")}`);
}