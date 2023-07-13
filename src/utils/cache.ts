import { keys, maxCachedItemNumber } from '../data'

import { Definition } from '../types'

const getCachedWords = () => {
    const cached_words = JSON.parse(
        localStorage.getItem(keys.cached_searches) ?? '[]'
    ) as Definition[]

    if (!Object.keys(cached_words).length) return []

    return cached_words
}

export const updateCachedWords = (word: string, data: Definition) => {
    const cached_words = getCachedWords()
    const { is_cached } = isWordCached(word)

    if (is_cached) return

    if (cached_words.length > maxCachedItemNumber - 1) cached_words.shift()

    cached_words.push(data)

    const unduplicated_words = cached_words.filter((value, index, self) => {
        return self.indexOf(value) === index
    })

    localStorage.setItem(
        keys.cached_searches,
        JSON.stringify(unduplicated_words)
    )
}

export const isWordCached = (word: string) => {
    const cached_words = getCachedWords()
    const word_cached_index = cached_words.findIndex((el) => el.word === word)

    return {
        is_cached: word_cached_index !== -1,
        cached_word: cached_words[word_cached_index],
    }
}
