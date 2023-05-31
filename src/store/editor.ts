import { create } from 'zustand'

interface EditorState {
    memoVisibility: Visibility;
    resourceList: Resource[];
    relationList: MemoRelation[];
    editMemoId?: MemoId
}

interface EditorActions {
    setEditMemoWithId: (editMemoId: MemoId) => void;
    clearEditMemo: () => void;
    setMemoVisibility: (memoVisibility: Visibility) => void;
    setResourceList: (resourceList: Resource[]) => void;
    setRelationList: (relationList: MemoRelation[]) => void;
}

export const useEditor = create<EditorState & EditorActions>((set) => ({
    memoVisibility: 'PRIVATE',
    relationList: [],
    resourceList: [],
    setEditMemoWithId: (editMemoId: MemoId) => {
        set(() => ({
            editMemoId
        }))
    },
    clearEditMemo: () => {
        set(() => ({
            editMemoId: undefined
        }))
    },
    setMemoVisibility: (memoVisibility: Visibility) => {
        set(() => ({
            memoVisibility: memoVisibility
        }))
    },
    setResourceList: (resourceList: Resource[]) => {
        set(() => ({
            resourceList
        }))
    },
    setRelationList: (relationList: MemoRelation[]) => {
        set(() => ({
            relationList
        }))
    },
}))