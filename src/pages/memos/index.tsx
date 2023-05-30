import { NavLink, Outlet } from "react-router-dom"
import { Home, Calendar, Paperclip, Settings } from 'lucide-react'

export default () => {
    return (
        <div className=" w-full min-h-[calc(100vh-64px)] flex flex-row justify-center ">
            <div>
                <ul className=" sticky top-16 w-56 flex flex-col items-start gap-4 text-xl ">
                    <li><NavLink className={({ isActive }) => ` ${isActive && 'bg-slate-50 shadow-md'} hover:bg-slate-50 hover:shadow-md flex items-center gap-2 p-2 rounded-lg`} to={'/memos/'}>
                        <Home></Home>Home
                    </NavLink></li>
                    <li><NavLink className={({ isActive }) => ` ${isActive && 'bg-slate-50 shadow-md'} hover:bg-slate-50 hover:shadow-md flex items-center gap-2 p-2 rounded-lg`} to={'/memos/review'}>
                        <Calendar></Calendar>Review
                    </NavLink></li>
                    <li><NavLink className={({ isActive }) => ` ${isActive && 'bg-slate-50 shadow-md'} hover:bg-slate-50 hover:shadow-md flex items-center gap-2 p-2 rounded-lg`} to={'/memos/resource'}>
                        <Paperclip></Paperclip>Resource
                    </NavLink></li>
                    <li><NavLink className={({ isActive }) => ` ${isActive && 'bg-slate-50 shadow-md'} hover:bg-slate-50 hover:shadow-md flex items-center gap-2 p-2 rounded-lg`} to={'/memos/setting'}>
                        <Settings></Settings>Setting
                    </NavLink></li>
                </ul>
            </div>
            <div className=" max-w-[768px] grow"><Outlet /></div>
        </div>
    )
}