export interface Definition {
    word: string
    phonetics: {
        region: string
        pronunciation: string
        transcription: string
    }[]
    meanings: {
        partOfSpeech: string
        synonym: string
        definitions: {
            domain: string
            level: string
            definition: string
            examples: string[]
        }[]
    }[]
}
