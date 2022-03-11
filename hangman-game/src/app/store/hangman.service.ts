import { Injectable } from '@angular/core';
import { HangmanStore } from './hangman.store';

@Injectable({
    providedIn: 'root',
})
export class HangmanService {
    constructor(private hangmanStore: HangmanStore) {    }

    addNewWord(newWord: string[]) {
        this.hangmanStore.update((state) => ({
            ...state,
            availableWords: newWord,
        }));
    }
    
    updateSelectedWordLength(newWordLength: number) {
        this.hangmanStore.update((state) => ({
            ...state,
            chosenWordLength: newWordLength,
        }));
    }
    
    updateCurrentWord(newWord: string) {
        this.hangmanStore.update((state) => ({
            ...state,
            word: newWord,
        }));
    }

}
