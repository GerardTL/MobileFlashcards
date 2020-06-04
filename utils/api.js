import { AsyncStorage } from 'react-native'
export const FLASHCARDS_STORAGE_KEY = 'FLASHCARDS_STORAGE_KEY';

export function getDecks () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
}

export function submitDeck (title) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }));
}

export function submitDecks (decks) {
  return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
}

export function removeDeck (key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}