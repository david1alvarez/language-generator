import { PhonemeTypes, Vowels } from "./constants"
import { getTranslations, updateTranslations } from "./translationsManager"
import { TTranslationDictionary } from "./types"

export const getWordTranslation = (word: string, targetVowelPhonemes: string[], targetConsonantPhonemes: {initial: string[], medial: string[], terminal: string[]}): string => {    
    let translatedDictionary: TTranslationDictionary = getTranslations()
    
    // prevent re-translation
    if (translatedDictionary[word.toLowerCase()]) {
        return translatedDictionary[word.toLowerCase()]
    }

    const isCapitalized: boolean = word[0] === word[0].toUpperCase()
    const phonemes: PhonemeTypes[] = findPhonemes(word.toLowerCase())
    let translatedWord: string = wordCreator(phonemes, targetVowelPhonemes, targetConsonantPhonemes)
    translatedDictionary[word.toLowerCase()] = translatedWord

    if (isCapitalized) {
        translatedWord = translatedWord[0].toUpperCase() + translatedWord.substring(1)
    }

    updateTranslations(word.toLowerCase(), translatedWord.toLowerCase())

    return translatedWord
}

const findPhonemes = (word: string): PhonemeTypes[] => {
    const wordLowercased = word.toLowerCase()

    let phonemeStructure: PhonemeTypes[] = []

    for (let i = 0; i < wordLowercased.length; i++) {
        if (Vowels.includes(wordLowercased[i])) {
            phonemeStructure.push(PhonemeTypes.VOWEL)
        } else {
            // allow for consonant clusters up to 2 in length.
            if (wordLowercased[i+1] && !Vowels.includes(wordLowercased[i+1])) {
                i++
            }
            phonemeStructure.push(PhonemeTypes.CONSONANT)
        }
    }

    return phonemeStructure
}

const wordCreator = (phonemeStructure: PhonemeTypes[], targetVowelPhonemes: string[], targetConsonantPhonemes: {initial: string[], medial: string[], terminal: string[]}): string => {
    let word: string = ""
    phonemeStructure.forEach((phoneme, i) => {
        let addition: string
        if (phoneme === PhonemeTypes.VOWEL) {
            addition = randomSelector(targetVowelPhonemes)
        } else {
            if (i === 0) {
                addition = randomSelector(targetConsonantPhonemes.initial)
            } else if (i === phonemeStructure.length - 1) {
                addition = randomSelector(targetConsonantPhonemes.terminal)
            } else {
                addition = randomSelector(targetConsonantPhonemes.medial)
            }
            
        }
        word = word + addition
    })
    return word
}

const randomSelector = <T>(list: T[]): T => {
    return list[Math.floor(Math.random()*list.length)]
}