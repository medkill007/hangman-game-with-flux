import { createSelector, select } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { Query } from '@datorama/akita';
import { HangmanState, HangmanStore } from './hangman.store';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HangmanQuery extends Query<HangmanState> {
    private selectState = (state: HangmanState) => state;

    private selectAvailableWords = createSelector(
        this.selectState,
        (state) => state.availableWords
    );
    private selectChosenWordLength = createSelector(
        this.selectState,
        (state) => state.chosenWordLength
    );
    private selectWord = createSelector(
        this.selectState,
        (state) => state.word
    );
    private selectAttemptedLetters = createSelector(
        this.selectState,
        (state) => state.attemptedLetters
    );

    constructor(protected override store: HangmanStore) {
        super(store);
    }

    allState$ = this.select();

    // ez visszaadja az elérhető szavak hosszát tömbben
    private selectAvailableWordsLengths = createSelector(
        this.selectAvailableWords,
        (availableWords) => {
            let availableWordsLenghts: number[] = [];

            availableWords.forEach((word: string) =>
                availableWordsLenghts.includes(word.length)
                    ? null
                    : availableWordsLenghts.push(word.length)
            );
            return availableWordsLenghts;
        }
    );

    getAvailableWordsLengths$ = this.ngRxSelect$(
        this.selectAvailableWordsLengths
    );

    /* get getAvailableWordsLengths() {
        return this.ngRxSelect(this.selectAvailableWordsLengths);
    } */

    private ngRxSelect$<UserState, K>(
        mapFn: (state: UserState) => K
    ): Observable<K> {
        return this.allState$.pipe(select(mapFn as any));
    }

    private ngRxSelect<UserState, K>(mapFn: (state: UserState) => K): K {
        return mapFn(this.getValue() as any);
    }
}

/* 


const baseDataSubject = new BehaviorSubject(baseData);
// @ts-ignore
window.baseDataSubject = baseDataSubject;
const baseSelector = (data: typeof baseData) => data;

const selectAvailableWords = createSelector(baseSelector, (state) => state.availableWords);
const selectChosenWordLength = createSelector(baseSelector, (state) => state.chosenWordLength);
const selectWord = createSelector(baseSelector, (state) => state.word);
const selectAttemptedLetters = createSelector(baseSelector, (state) => state.attemptedLetters);


const selectAvailableWordsLengths = createSelector(
    selectAvailableWords,
    (availableWords) => {
        let availableWordsLenghts:number[] = [];

        availableWords.map((word: string) => ( !availableWordsLenghts.includes(word.length) ?? availableWordsLenghts.push(word.length)));

        return availableWordsLenghts;
    }
);

// TODO írjatok egy selectort, ami az eltalált helyes betűket adja vissza tömbként
const selectCorrectLetters = createSelector(
    selectWord,
    selectAttemptedLetters,
    (word, attemptedLetters) => {
        return attemptedLetters.filter((attemptedLetter) => word.includes(attemptedLetter));
    }
);

const selectIncorrectLetters = createSelector(
    selectWord,
    selectAttemptedLetters,
    (word, attemptedLetters) => {
        return attemptedLetters.filter((attemptedLetter) => !word.includes(attemptedLetter));
    }
);
// TODO a játékot akkor veszti el a játékos, ha 10-szer rossz betűt választott ki
// Implementáljátok le azt a selectort, ami visszaadja, hogy vesztett-e a user
const selectGameOver = createSelector(selectIncorrectLetters, (incorrectLetters) => {
    if (incorrectLetters.length >= 10) {
        return 'ne legyél hülye';
    } else {
        return 'még jó vagy';
    }
});
// TODO olyan selector kell, ami megmondja, hogy nyert-e a user
const selectIsGameOver = createSelector(selectIncorrectLetters, (incorrectLetters) => {
    if (incorrectLetters.length >= 10) {
        return true;
    }
    return false;
});
const selectIsGameWon = createSelector(selectWord, selectCorrectLetters, (word, correctLetters) => {    
    const allLettersCanBeFoundInCorrectLetters = (word ?? '').split('').every((character) => {
        return correctLetters.includes(character);
    });
    return allLettersCanBeFoundInCorrectLetters;
});


baseDataSubject.asObservable().pipe(select(selectIsGameOver)).subscribe((isGameOver) => {
    console.log('isGameOver eredménye: ', isGameOver);
})
baseDataSubject.asObservable().pipe(select(selectIsGameWon)).subscribe((isGameWon) => {
    console.log('isGameWon eredménye: ', isGameWon);
})
 */
