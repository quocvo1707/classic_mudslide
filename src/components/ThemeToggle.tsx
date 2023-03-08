import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'

import useTheme from '../hooks/useTheme'

const ThemeToggle = () => {
    const { theme, handleToggleTheme } = useTheme()
    return (
        <div
            className='relative flex cursor-pointer items-center text-2xl text-[var(--violet)]'
            onClick={handleToggleTheme}
        >
            {theme === 'light' ? <HiOutlineSun /> : <HiOutlineMoon />}
        </div>
    )
}

export default ThemeToggle
