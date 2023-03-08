import {
    Dispatch,
    FC,
    FormEvent,
    SetStateAction,
    useEffect,
    useRef,
} from 'react'

import { BiSearch } from 'react-icons/bi'
import LoadingIcon from './LoadingIcon'

interface SearchInputProps {
    word: string
    isFetching: boolean
    shouldTriggerSubmit: boolean
    setWord: Dispatch<SetStateAction<string>>
    handleSubmit: (e: FormEvent) => void
}

const SearchInput: FC<SearchInputProps> = (props) => {
    const { word, isFetching, shouldTriggerSubmit, setWord, handleSubmit } =
        props
    const search_input_ref = useRef<HTMLInputElement>(null)
    const submit_button_ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (shouldTriggerSubmit && submit_button_ref.current) {
            submit_button_ref.current.click()
        }
    }, [])

    return (
        <form
            className='relative my-0 mx-auto flex w-full max-w-lg items-center rounded-xl bg-[var(--gray-light)]'
            onSubmit={handleSubmit}
        >
            <input
                className='w-full rounded-lg bg-transparent p-4 font-semibold'
                placeholder=''
                value={word}
                onChange={(e) => setWord(e.target.value)}
                ref={search_input_ref}
            />
            {isFetching && <LoadingIcon />}
            <div
                className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-[var(--violet)]'
                onClick={handleSubmit}
                ref={submit_button_ref}
            >
                <BiSearch title='Search' />
            </div>
        </form>
    )
}

export default SearchInput
