const fetchRawContent = async (
    word: string,
    options = {} as {
        [x: string]: string
    }
): Promise<string> => {
    const defaultLanguage = 'english'
    const { from, to } = {
        from: defaultLanguage,
        to: defaultLanguage,
        ...options,
    }

    const language = from !== to ? `${from}-${to}` : from
    const url = `https://dictionary.cambridge.org/dictionary/${language}/${word}`
    const raw_content = await fetch(
        `https://api.allorigins.win/raw?url=${url}`
    ).then((response) => response.text())

    return raw_content
}

export default fetchRawContent
