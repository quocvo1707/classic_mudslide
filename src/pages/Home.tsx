import { FormEvent, useMemo, useState } from 'react'

import throttle from 'lodash/throttle'
import Header from '../components/Header'
import SearchInput from '../components/SearchInput'
import Word from '../components/Word'
import { keys } from '../data'
import useFetch from '../hooks/useFetch'

const Home = () => {
    const previous_search = localStorage.getItem(keys.previous_search) ?? ''
    const [word, setWord] = useState(previous_search)
    const { data, refetch, is_fetching } = useFetch(word)

    const throttledRefetch = useMemo(() => throttle(refetch, 750), [refetch])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()

        if (word.length === 0) return

        throttledRefetch()
    }

    return (
        <>
            <Header />
            <SearchInput
                word={word}
                isFetching={is_fetching}
                shouldTriggerSubmit={previous_search !== ''}
                setWord={setWord}
                handleSubmit={handleSubmit}
            />
            <Word isFetching={is_fetching} content={data} />
        </>
    )
}

export default Home
