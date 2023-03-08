import { load } from 'cheerio'
import { Definition } from '../types'

const formatToPattern = (text: string) => {
    const formattedText = text
        .replace(/→/gm, '')
        .replace(/[\s\n|\t]+/gm, ' ')
        .replace(/\(|\)/gm, '')
        .trim()
    return formattedText
}

const removeExtraChars = (text: string) => {
    const formattedText = formatToPattern(text)
    return formattedText
}

const parseHtml = (html: string): Definition => {
    const $ = load(html)
    return {
        word: $('.headword .dhw').first().text(),
        phonetics: $('.pos-header .dpron-i')
            .map((_, el) => {
                const region = $(el).find('.region').text()
                const pronunciation = `https://dictionary.cambridge.org${$(el)
                    .find('.daud audio source[type="audio/mpeg"]')
                    ?.attr('src')}`
                const transcription = $(el).find('.pron').text()

                return {
                    region,
                    pronunciation,
                    transcription,
                }
            })
            .get()
            .slice(0, 2),
        meanings: $('.pos-body .pr.dsense')
            .map((_, el) => {
                const head = $(el).find('.dsense_h')
                const body = $(el).find('.dsense_b')
                const partOfSpeech =
                    head.find('.dsense_pos').length &&
                    head.find('.dsense_pos').text() !== ''
                        ? `${head
                              .find('.dsense_pos')
                              .map((_, el) => $(el).text())
                              .get()
                              .join(', ')} ${head.find('.dgram').text()} ${head
                              .find('.dsense_gw')
                              .text()
                              .trim()}`
                        : `${$(el)
                              .parent()
                              .prev()
                              .find('.pos-header .dpos')
                              .map((_, el) => $(el).text())
                              .get()
                              .join(', ')} ${$(el)
                              .parent()
                              .prev()
                              .find('.pos-header .dgram')
                              .text()} ${$(el)
                              .parent()
                              .prev()
                              .find('.pos-header .dlab')
                              .text()}`
                const synonym = removeExtraChars(
                    head.find('.dsense_gw').text().toLowerCase()
                )
                const definitions = body
                    .find('.ddef_block')
                    .map((_, el) => {
                        const domain = $(el).find('.ddef-info .dgram').text()
                        const level = $(el).find('.ddef-info .epp-xref').text()
                        const definition = $(el).find('.ddef_d').text()
                        const examples = $(el)
                            .find('.ddef_b .deg')
                            .map((_, el) => $(el).text())
                            .get()
                        return {
                            domain,
                            level,
                            definition,
                            examples,
                        }
                    })
                    .get()

                return {
                    partOfSpeech,
                    synonym,
                    definitions,
                }
            })
            .get(),
    }
}

export default parseHtml
