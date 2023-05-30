import Auth from '@/pages/Auth'
import Excalidraw from '@/pages/Excalidraw'
import Memos from '@/pages/memos'
import Home from '@/pages/memos/Home'
import Resource from '@/pages/memos/Resource'
import Review from '@/pages/memos/Review'
import Settings from '@/pages/memos/Settings'
import NotFound from '@/pages/NotFound'
import Root from '@/pages/Root'
import { initialGlobalState } from '@/store'
import { toast } from 'react-hot-toast'
import { createBrowserRouter } from 'react-router-dom'

const initialGlobalStateLoader = (() => {
    let done = false
    return async () => {
        if (done) return
        done = true
        try {
            await initialGlobalState()
        } catch (error: any) {
            toast.error(error)
        }
    }
})()


const router = createBrowserRouter([
    {
        path: "/auth",
        element: <Auth />,
        loader: async () => {
            await initialGlobalStateLoader()
            return null
        }
    }, {
        path: "",
        element: <Root />,
        loader: async () => {
            await initialGlobalStateLoader()
            return null
        },
        children: [
            {
                path: '/memos',
                element: <Memos />,
                children: [
                    {
                        path: '/memos',
                        element: <Home />
                    },
                    {
                        path: '/memos/review',
                        element: <Review />
                    },
                    {
                        path: '/memos/resource',
                        element: <Resource />
                    },
                    {
                        path: '/memos/setting',
                        element: <Settings />
                    }
                ]
            },
            {
                path: '/excalidraw',
                element: <Excalidraw />
            }
        ]
    }, {
        path: "*",
        element: <NotFound />
    }
])

export default router