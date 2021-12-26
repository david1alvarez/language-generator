import {
  BlackSpeechConsonants,
  BlackSpeechInitialConsonants,
  BlackSpeechTerminalConsonants,
  BlackSpeechVowels,
} from "./phonemes";
import { getWordTranslation } from "./stringUtils";

let userText = process.argv[2];

const translateText = (text: string): string => {
  const words = text.split(" ");
  const translatedWords: string[] = words.map((word) =>
    getWordTranslation(word, BlackSpeechVowels, {
      initial: BlackSpeechInitialConsonants,
      medial: BlackSpeechConsonants,
      terminal: BlackSpeechTerminalConsonants,
    })
  );
  const translatedText = translatedWords.join(" ");
  return translatedText;
};

console.log(translateText(userText));
