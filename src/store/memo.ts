import { create } from 'zustand'
import * as api from '@/api'
import { unionBy } from 'lodash-es';

export const convertResponseModelMemo = (memo: Memo): Memo => {
    return {
        ...memo,
        createdTs: memo.createdTs * 1000,
        updatedTs: memo.updatedTs * 1000,
        displayTs: memo.displayTs * 1000,
    };
}

interface MemoState {
    memos: Memo[]
}

interface MemoActions {
    fetchMemos: (limit?: number, offset?: number) => Promise<Memo[]>;
    createMemo: (memo: MemoCreate) => Promise<Memo>;
    patchMemo: (memoPatch: MemoPatch) => void;
    pinMemo: (memoId: MemoId) => void;
    unpinMemo: (memoId: MemoId) => void;
    delMemo: (memoId: MemoId) => void
}

export const useMemos = create<MemoState & MemoActions>((set, get) => ({
    memos: [] as Memo[],
    fetchMemos: async (limit: number = 20, offset: number = 0) => {
        const memoFind: MemoFind = {
            rowStatus: "NORMAL",
            limit,
            offset
        }
        const { data } = (await api.getMemoList(memoFind)).data
        const fetchedMemos = data.map((m) => convertResponseModelMemo(m))
        set((state) => ({ memos: unionBy([...state.memos, ...fetchedMemos], "id") }))
        return fetchedMemos
    },
    createMemo: async (memoCreate: MemoCreate) => {
        const { data } = (await api.createMemo(memoCreate)).data
        const memo = convertResponseModelMemo(data)
        set(() => ({ memos: [memo,...get().memos] }))
        return memo
    },
    patchMemo: async (memoPatch: MemoPatch) => {
        const { data } = (await api.patchMemo(memoPatch)).data
        const memo = convertResponseModelMemo(data)
        set(() => ({
            memos: get().memos.map((memo) => {
                if (memo.id === memoPatch.id) {
                    return {
                        ...memo,
                        ...memoPatch
                    }
                } else {
                    return memo
                }
            }).filter((memo) => memo.rowStatus === 'NORMAL')
        }))
        return memo
    },
    pinMemo: async (memoId: MemoId) => {
        await api.pinMemo(memoId)
        set(() => ({
            memos: get().memos.map((memo) => {
                if (memo.id === memoId) {
                    return {
                        ...memo,
                        pinned: true
                    }
                } else {
                    return memo
                }
            })
        }))
    },
    unpinMemo: async (memoId: MemoId) => {
        await api.unpinMemo(memoId)
        set(() => ({
            memos: get().memos.map((memo) => {
                if (memo.id === memoId) {
                    return {
                        ...memo,
                        pinned: false
                    }
                } else {
                    return memo
                }
            })
        }))
    },
    delMemo: async (memoId: MemoId) => {
        await api.deleteMemo(memoId)
        set(() => ({
            memos: get().memos.filter((memo) => memo.id !== memoId)
        }))
    }
}))