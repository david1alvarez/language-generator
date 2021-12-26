import { BlackSpeechConstants, BlackSpeechVowels } from "./phonemes"
import { getWordTranslation } from "./stringUtils"

let userText = process.argv[2]

const translateText = (text: string): string => {
    const words = text.split(" ")
    const translatedWords: string[] = words.map(word => getWordTranslation(word, BlackSpeechVowels, BlackSpeechConstants, {}).translatedWord)
    const translatedText = translatedWords.join(" ")
    return translatedText
}

console.log(translateText(userText))
