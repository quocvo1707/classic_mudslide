import { load } from 'cheerio'

const analyseHtml = (html: string) => {
    const $ = load(html)
    const is_not_definition_page = !!$('dpron-i').length

    return is_not_definition_page
}

export default analyseHtml
