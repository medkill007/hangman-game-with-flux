import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import * as wordsModule from 'src/assets/hangman_words.json';

export interface HangmanState {
  availableWords: string[];
  chosenWordLength: number;
  word: string;
  attemptedLetters: string[];
}

export function createInitialState(): HangmanState {
  return {
    availableWords: getWordsAsStringArray(), // Összes lehetséges szó, amikből random kap a user
    chosenWordLength: 0, //User által kiválasztott szó hossz
    word: '', // A konkrét feladat, amit ki kell találnia a usernek
    attemptedLetters: [] // User által megpróbált betűk
  };
}

@Injectable({
  providedIn: 'root'
})

@StoreConfig({ name: 'hangman' })
export class HangmanStore extends Store<HangmanState> {
  constructor() {
    super(createInitialState());
  }
}

function getWordsAsStringArray(): string[] {
  const wordsModuleAsStringArray = wordsModule as string[];
  const availableWordsAsArray: string[] = [];
  for (let i = 0; i < wordsModuleAsStringArray.length; i++) {
    availableWordsAsArray[i] = wordsModuleAsStringArray[i];
  }
  return availableWordsAsArray;
}