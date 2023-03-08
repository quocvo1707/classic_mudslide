import { RiBookLine } from 'react-icons/ri'
import ThemeToggle from './ThemeToggle'

const Header = () => {
    return (
        <header className='mb-8 flex items-center justify-between'>
            <RiBookLine className='min-w-[40px] text-[2rem]' />
            <ThemeToggle />
        </header>
    )
}

export default Header
