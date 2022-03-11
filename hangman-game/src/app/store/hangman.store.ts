import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface HangmanState {
  availableWords: string[];
  chosenWordLength: number;
  word: string;
  attemptedLetters: string[];
}

export function createInitialState(): HangmanState {
  return {
    availableWords: [], // Összes lehetséges szó, amikből random kap a user
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