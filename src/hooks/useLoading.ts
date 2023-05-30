import { useState } from "react"

export default (initState: boolean = true) => {
    const [state, setState] = useState({
        isLoading: initState,
        isFaild: false,
        isSucceed: false
    })
    return {
        ...state,
        setLoading: () => {
            setState({
                isLoading: true,
                isFaild: false,
                isSucceed: false
            })
        },
        setFinish: () => {
            setState({
                isLoading: false,
                isFaild: false,
                isSucceed: true
            })
        },
        setError: () => {
            setState({
                isLoading: false,
                isFaild: true,
                isSucceed: false
            })
        }
    }
}