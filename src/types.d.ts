export interface Phonetic {
    region: string
    pronunciation: string
    transcription: string
}

export interface SubDefinition {
    domain: string
    level: string
    definition: string
    examples: string[]
}

export interface Meaning {
    partOfSpeech: string
    synonym: string
    definitions: SubDefinition[]
}

export interface Definition {
    word: string
    phonetics: Phonetic[]
    meanings: Meaning[]
}
