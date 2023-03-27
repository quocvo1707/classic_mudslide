import { Meaning, SubDefinition } from '../types'

const mergeItems = (data: SubDefinition[]) => {
    return data.reduce((acc: SubDefinition[], curr: SubDefinition) => {
        let existing = acc.find((item) => item.definition === curr.definition)
        if (existing) {
            if (existing.level && curr.level && existing.level !== curr.level) {
                existing.level += '/' + curr.level
            } else if (!existing.level && curr.level) {
                existing.level = curr.level
            }
            existing.examples = Array.from(
                new Set([...existing.examples, ...curr.examples])
            )
        } else acc.push(curr)

        return acc
    }, [])
}

export const filterDuplicatedItems = (items: Meaning[]) => {
    let merged_items = items
        .reduce((filtered_items: Meaning[], word: Meaning) => {
            const is_existed = filtered_items.find(
                (combinedWord) =>
                    combinedWord.partOfSpeech === word.partOfSpeech
            )

            if (is_existed) is_existed.definitions.push(...word.definitions)
            else filtered_items.push(word)

            return filtered_items
        }, [])
        .map((item) => ({
            ...item,
            definitions: mergeItems(item.definitions),
        }))

    return merged_items
}
