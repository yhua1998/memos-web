import { storage } from '@/utils/common';
import { create } from 'zustand'
import * as api from '@/api'

interface GlobalState {
    locale: Locale;
    appearance: Appearance;
    systemStatus: SystemStatus
}

interface GloablActions {
    setAppearance: (appearance: Appearance) => void;
    setLocale: (locale: Locale) => void
}

export const initialGlobalState = async () => {
    const defaultGlobalState = {
        locale: 'zh',
        appearance: 'system',
        systemStatus: {
            host: undefined,
            profile: {
                mode: 'demo',
                version: '',
            },
            dbSize: 0,
            allowSignUp: false,
            ignoreUpgrade: false,
            disablePublicMemos: false,
            additionalStyle: '',
            additionalScript: '',
            memoDisplayWithUpdatedTs: false,
            customizedProfile: {
                name: 'memos',
                logoUrl: '/logo.webp',
                description: '',
                locale: 'zh',
                appearance: 'system',
                externalUrl: ''
            },
            maxUploadSizeMib: 10,
            storageServiceId: -1,
            localStoragePath: ''
        }
    } as GlobalState
    const { locale: storageLocale, appearance: storageAppearance } = storage.get(["locale", "appearance"])
    if (storageLocale) {
        defaultGlobalState.locale = storageLocale
    }
    if (storageAppearance) {
        defaultGlobalState.appearance = storageAppearance
    }
    const { data } = (await api.getSystemStatus()).data
    if (data) {
        const customizedProfile = data.customizedProfile
        defaultGlobalState.systemStatus = {
            ...data,
            customizedProfile: {
                name: customizedProfile.name || "memos",
                logoUrl: customizedProfile.logoUrl || "/logo.webp",
                description: customizedProfile.description,
                locale: customizedProfile.locale || "zh",
                appearance: customizedProfile.appearance || "system",
                externalUrl: ""
            }
        }
        defaultGlobalState.locale = storageLocale || defaultGlobalState.systemStatus.customizedProfile.locale || "zh"
        defaultGlobalState.appearance = defaultGlobalState.systemStatus.customizedProfile.appearance
    }
    useGlobal.setState(() => ({ ...defaultGlobalState }))
}

export const useGlobal = create<GlobalState & GloablActions>((set) => ({
    locale: 'zh',
    appearance: 'system',
    systemStatus: {
        host: undefined,
        profile: {
            mode: 'demo',
            version: '',
        },
        dbSize: 0,
        allowSignUp: false,
        ignoreUpgrade: false,
        disablePublicMemos: false,
        additionalStyle: '',
        additionalScript: '',
        memoDisplayWithUpdatedTs: false,
        customizedProfile: {
            name: 'memos',
            logoUrl: '/logo.webp',
            description: '',
            locale: 'zh',
            appearance: 'system',
            externalUrl: ''
        },
        maxUploadSizeMib: 10,
        storageServiceId: -1,
        localStoragePath: ''
    },
    setAppearance: (appearance: Appearance) => set(() => ({ appearance })),
    setLocale: (locale: Locale) => set(() => ({ locale }))
}))
