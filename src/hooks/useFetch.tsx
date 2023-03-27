import { isWordCached, updateCachedWords } from '../utils/cache'

import { load } from 'cheerio'
import { useQuery } from 'react-query'
import fetchRawContent from '../api/fetch'
import parseHtml from '../api/parse'
import { keys } from '../data'

const isNotDefinitionPage = (html: string) => {
    const $ = load(html)
    const is_not_definition_page = !!$('dpron-i').length

    return is_not_definition_page
}

const useFetch = (word: string) => {
    const fetchWordData = async () => {
        const { is_cached, cached_word } = isWordCached(word)

        if (is_cached) {
            localStorage.setItem(keys.previous_search, word)
            updateCachedWords(word, cached_word)
            return cached_word
        }

        const raw_html = await fetchRawContent(word)
        const is_not_found = isNotDefinitionPage(raw_html)

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
