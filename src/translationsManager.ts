import fs from 'fs'
import { TTranslationDictionary } from './types'

const filepath = './translations.json'

export const getTranslations = (): TTranslationDictionary => {
    let translations: TTranslationDictionary = {}

    try {
        const rawData = fs.readFileSync(filepath)
        translations = JSON.parse(rawData.toString())
    } catch (err) {
        translations = {}
    }

    return translations
}

export const updateTranslations = (word: string, translation: string): void => {
    let translations = getTranslations()
    translations[word] = translation
    const stringifiedTranslations = JSON.stringify(translations)
    fs.writeFileSync(filepath, stringifiedTranslations)
}