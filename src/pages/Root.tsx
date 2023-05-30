import Header from "@/components/Header"
import { Outlet } from "react-router-dom"

export default () => {
    return (
        <div className="w-full min-h-full bg-zinc-100 dark:bg-zinc-800">
            <div className=" w-full min-h-full flex flex-col justify-center items-start">
                <div className="w-full sticky top-0 backdrop-blur-lg " ><Header /></div>
                <Outlet />
            </div>
        </div>
    )
}