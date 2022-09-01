import {useCallback, useState} from "react";
import {toast} from "react-toastify";

export const useHttp = () => {

    const [loading, setLoading] = useState(false)

    const request = useCallback(async (
        url,
        method = "GET",
        body = null,
        headers = {}) => {

        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})

            const data = await response.json()
            if (response.status === 401) {
                localStorage.clear()
            }

            if (!response.ok) {
                toast.info(data.message || "response Error")
            }

            setLoading(false)
            return data

        } catch (e) {
            setLoading(false)
            console.log(e)
        }

    }, [])



    return {loading, request}
}