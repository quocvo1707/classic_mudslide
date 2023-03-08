import { useLayoutEffect, useState } from 'react'

import { keys } from '../data'

const useTheme = () => {
    const [theme, setTheme] = useState<string>(
        localStorage.getItem(keys.data_theme) ?? 'light'
    )
    const root = document.querySelector('html') as HTMLHtmlElement

    const handleToggleTheme = () =>
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))

    useLayoutEffect(() => {
        root.setAttribute(keys.data_theme, theme)
        localStorage.setItem(keys.data_theme, theme)
    }, [theme, root])

    return {
        theme,
        handleToggleTheme,
    }
}

export default useTheme
