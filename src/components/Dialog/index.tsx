import React from "react"
import ReactDOM from "react-dom/client"

interface Props {
    children: React.ReactNode,
    outClick: () => void
}

const PreviewImg = ({ children, outClick }: Props) => {
    return (
        <div onClick={outClick} className=" bg-slate-900 bg-opacity-60 fixed top-0 left-0 w-full h-full backdrop-blur-[3px] flex justify-center items-center">
            <div>
                {children}
            </div>
        </div>
    )
}

export const showImgPreViewDialog = (src: string) => {

    const dialogDiv = document.createElement('div')

    document.body.append(dialogDiv)

    const dialog = ReactDOM.createRoot(dialogDiv as HTMLElement)

    const handleOutClick = () => {
        console.log("注销dialog")
        dialog.unmount()
        document.body.classList.remove("overflow-hidden")
        dialogDiv.remove()
    }

    document.body.classList.add("overflow-hidden")

    dialog.render(
        <PreviewImg outClick={handleOutClick}>
            <img src={src} />
        </PreviewImg>
    )
}