import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { camelCase } from 'lodash-es'
import * as api from '@/api'
import { getSystemColorScheme, storage } from '@/utils/common';

const defaultSetting: Setting = {
    locale: "zh",
    appearance: getSystemColorScheme(),
    memoVisibility: "PRIVATE",
    telegramUserId: "",
};

const defaultLocalSetting: LocalSetting = {
    enableDoubleClickEditing: true,
    dailyReviewTimeOffset: 0,
    enableAutoCollapse: true,
};

export const convertResponseModelUser = (user: User): User => {
    const setting: Setting = {
        ...defaultSetting,
    };
    const { localSetting: storageLocalSetting } = storage.get(["localSetting"]);
    const localSetting: LocalSetting = {
        ...defaultLocalSetting,
        ...storageLocalSetting,
    };

    if (user.userSettingList) {
        for (const userSetting of user.userSettingList) {
            (setting as any)[camelCase(userSetting.key)] = JSON.parse(userSetting.value);
        }
    }

    return {
        ...user,
        setting,
        localSetting,
        createdTs: user.createdTs * 1000,
        updatedTs: user.updatedTs * 1000,
    } as User;
};

interface UserState {
    host?: User;
    user?: User;
    userById: { [key: UserId]: User }
}

interface UserActions {
    setHost: (user: User) => void;
    setUser: (user: User) => void;
    setUserById: (user: User) => void;
    patchUser: (userPartial: Partial<User>) => void,
    doSignIn: () => Promise<User>;
    doSignOut: () => void;
}

const doSignOut = async () => {
    await api.signout()
}

const useUser = create(immer<UserState & UserActions>((set) => ({
    userById: {},
    setHost: (user: User) => set(() => ({ host: user })),
    setUser: (user: User) => set(() => ({ user })),
    setUserById: (user: User) => set(() => ({ userById: { [user.id]: user } })),
    patchUser: (userPartial: Partial<User>) => set((state) => {
        state.user = { ...state.user, ...(userPartial as User) }
    }),
    doSignIn: async () => {
        const { data: user } = (await api.getSelfUser()).data
        if (user) {
            set(() => { user: convertResponseModelUser(user) })
        } else {
            doSignOut()
        }
        return user
    },
    doSignOut: doSignOut
})))

export {
    useUser
}