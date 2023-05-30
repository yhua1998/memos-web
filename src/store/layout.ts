import { create } from 'zustand'

interface LayoutState {
    showHeader: boolean;
    showHomeSidebar: boolean;
}

interface LayutActions {
    setHeaderStatus: (headerStatus: boolean) => void;
    setHomeSidebarStatus: (homeSidebarStatus: boolean) => void;
}

const useLayout = create<LayoutState & LayutActions>((set) => ({
    showHeader: false,
    showHomeSidebar: false,
    setHeaderStatus: (headerStatus: boolean) => set(() => ({ showHeader: headerStatus })),
    setHomeSidebarStatus: (homeSidebarStatus: boolean) => set(() => ({ showHomeSidebar: homeSidebarStatus }))
}))

export {
    useLayout
}