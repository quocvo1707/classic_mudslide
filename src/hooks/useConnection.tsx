import { useEffect, useState } from 'react'

const useConnection = () => {
    const [is_online, setIsOnline] = useState(navigator.onLine)

    const handleNetworkChange = () => {
        setIsOnline(navigator.onLine)
    }

    useEffect(() => {
        window.addEventListener('online', handleNetworkChange)
        window.addEventListener('offline', handleNetworkChange)

        return () => {
            window.removeEventListener('online', handleNetworkChange)
            window.removeEventListener('offline', handleNetworkChange)
        }
    }, [])

    return is_online
}

export default useConnection
