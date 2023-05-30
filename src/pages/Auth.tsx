import useLoading from '@/hooks/useLoading'
import { useGlobal, useUser } from '@/store'
import React, { useState } from 'react'
import * as api from '@/api'
import { toast } from 'react-hot-toast'
import { Loader } from 'lucide-react'

const Auth = () => {

    const [, , systemStatus, ] = useGlobal(
        (state) => [state.appearance, state.locale, state.systemStatus, state.setAppearance]
    )
    // const [] = useLayout((state) => [])
    const [doSignIn] = useUser((state) => [state.doSignIn])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const actionBtnLoadingState = useLoading(false)

    const handleUsernameInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        setUsername(text)
    }

    const handlePasswordInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        setPassword(text)
    }

    // const handleAppearanceSelectChange = (appearance: Appearance) => {
    //     setAppearance(appearance)
    // }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (systemStatus.host) {
            handleSignInBtnClick()
        } else {
            handleSignUpBtnClick()
        }
    }

    const handleSignInBtnClick = async () => {
        if (!username || !password) return
        if (actionBtnLoadingState.isLoading) return
        try {
            actionBtnLoadingState.setLoading()
            // 登录
            await api.signin(username, password)
            // 获取数据
            const user = await doSignIn()
            if (user) {
                window.location.href = "/"
            } else {
                toast.error("登录失败")
            }
        } catch (error: any) {
            toast.error(error.response.data.message || error.message || "登录发生错误")
        } finally {
            actionBtnLoadingState.setFinish()
        }
    }
    const handleSignUpBtnClick = async () => {
        if (!username || !password) return
        if (actionBtnLoadingState.isLoading) return
        try {
            actionBtnLoadingState.setLoading()
            await api.signup(username, password)
            const user = await doSignIn()
            if (user) {
                window.location.href = "/"
            } else {
                toast.error("注册失败")
            }
        } catch (error: any) {
            toast.error(error.response.data.message || error.message || "注册发生错误")
        } finally {
            actionBtnLoadingState.setFinish()
        }
    }

    return (
        <>
            <div className="flex flex-row justify-center items-center w-full h-full dark:bg-zinc-800">
                <div className="w-80 max-w-full h-full py-4 flex flex-col justify-start items-center">
                    <div className="w-full py-4 grow flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-start items-start w-full mb-4">
                            <div className="w-full flex flex-row justify-start items-center mb-2">
                                <img className="h-12 w-auto rounded-lg mr-1" src={systemStatus.customizedProfile.logoUrl} alt="" />
                                <p className="text-6xl tracking-wide text-black opacity-80 dark:text-gray-200">{systemStatus.customizedProfile.name}</p>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                {systemStatus.customizedProfile.description || "welcome to memos"}
                            </p>
                        </div>
                        <form className="w-full" onSubmit={handleFormSubmit}>
                            <div className={`flex flex-col justify-start items-start w-full ${actionBtnLoadingState.isLoading && "opacity-80"}`}>
                                <div className="flex flex-col justify-start items-start relative w-full text-base mt-2 py-2">
                                    <span
                                        className={`absolute top-3 left-3 px-1 leading-10 shrink-0 text-base cursor-text text-gray-400 transition-all select-none pointer-events-none ${username ? "!text-sm !top-0 !z-10 !leading-4 bg-white dark:bg-zinc-800 rounded" : ""
                                            }`}
                                    >
                                        {"名字"}
                                    </span>
                                    <input
                                        className="input-text w-full py-3 px-3 text-base rounded-lg dark:bg-zinc-800"
                                        type="text"
                                        value={username}
                                        onChange={handleUsernameInputChanged}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col justify-start items-start relative w-full text-base mt-2 py-2">
                                    <span
                                        className={`absolute top-3 left-3 px-1 leading-10 shrink-0 text-base cursor-text text-gray-400 transition-all select-none pointer-events-none ${password ? "!text-sm !top-0 !z-10 !leading-4 bg-white dark:bg-zinc-800 rounded" : ""
                                            }`}
                                    >
                                        {"密码"}
                                    </span>
                                    <input
                                        className="input-text w-full py-3 px-3 text-base rounded-lg dark:bg-zinc-800"
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordInputChanged}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-end items-center w-full mt-2">
                                {systemStatus?.host ? (
                                    <>
                                        {actionBtnLoadingState.isLoading && <Loader className="w-4 h-auto mr-2 animate-spin dark:text-gray-300" />}
                                        {systemStatus?.allowSignUp && (
                                            <>
                                                <button
                                                    type="button"
                                                    className={`btn-text ${actionBtnLoadingState.isLoading ? "cursor-wait opacity-80" : ""}`}
                                                    onClick={handleSignUpBtnClick}
                                                >
                                                    {"注册"}
                                                </button>
                                                <span className="mr-2 font-mono text-gray-200">/</span>
                                            </>
                                        )}
                                        <button
                                            type="submit"
                                            className={`btn-primary ${actionBtnLoadingState.isLoading ? "cursor-wait opacity-80" : ""}`}
                                            onClick={handleSignInBtnClick}
                                        >
                                            {"登录"}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="submit"
                                            className={`btn-primary ${actionBtnLoadingState.isLoading ? "cursor-wait opacity-80" : ""}`}
                                            onClick={handleSignUpBtnClick}
                                        >
                                            {"注册HOST"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                        {/* {identityProviderList.length > 0 && (
                            <>
                                <Divider className="!my-4">{t("common.or")}</Divider>
                                <div className="w-full flex flex-col space-y-2">
                                    {identityProviderList.map((identityProvider) => (
                                        <Button
                                            key={identityProvider.id}
                                            variant="outlined"
                                            color="neutral"
                                            className="w-full"
                                            size="md"
                                            onClick={() => handleSignInWithIdentityProvider(identityProvider)}
                                        >
                                            {t("common.sign-in-with", { provider: identityProvider.name })}
                                        </Button>
                                    ))}
                                </div>
                            </>
                        )} */}
                        {!systemStatus?.host && (
                            <p className="w-full inline-block float-right text-sm mt-4 text-gray-500 text-right whitespace-pre-wrap">
                                {"host用户不存在"}
                            </p>
                        )}
                    </div>
                    {/* <div className="flex flex-row items-center justify-center w-full gap-2">
                        <LocaleSelect value={locale} onChange={handleLocaleSelectChange} />
                        <AppearanceSelect value={appearance} onChange={handleAppearanceSelectChange} />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Auth