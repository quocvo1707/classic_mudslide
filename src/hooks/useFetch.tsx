import { useQuery } from 'react-query'
import analyseHtml from '../api/analyse'
import fetchRawContent from '../api/fetch'
import parseHtml from '../api/parse'
import { keys } from '../data'
import useCache from './useCache'

const useFetch = (word: string) => {
    const { updateCachedWords, isWordCached } = useCache()

    const fetchWordData = async () => {
        const { is_cached, cached_word } = isWordCached(word)

        if (is_cached) {
            localStorage.setItem(keys.previous_search, word)
            updateCachedWords(word, cached_word)
            return cached_word
        }

        const raw_html = await fetchRawContent(word)
        const is_not_found = analyseHtml(raw_html)

        if (is_not_found) return undefined

        const content = parseHtml(raw_html)

        if (!content.phonetics.length || !content.meanings.length)
            return undefined

        localStorage.setItem(keys.previous_search, word)
        updateCachedWords(word, content)

        return content
    }

    const {
        data,
        refetch,
        isFetching: is_fetching,
    } = useQuery({
        queryKey: ['data'],
        queryFn: fetchWordData,
        refetchOnWindowFocus: false,
        enabled: false,
        retry: 1,
    })

    return { data, refetch, is_fetching }
}

export default useFetch
