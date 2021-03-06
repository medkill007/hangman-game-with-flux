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

    getSelectWord$ = this.ngRxSelect$(this.selectWord);
    getSelectAttemptedLetters$ = this.ngRxSelect$(this.selectAttemptedLetters);

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

    // kiválaszt egy random szót a szóhossza alapján
    private generateRandomWord = createSelector(
        this.selectAvailableWords,
        this.selectChosenWordLength,
        (availableWords, chosenWordLength) => {
            let availableWordsByChosenLenght: string[] = [];

            for (let i = 0; i < availableWords.length; i++) {
                if (availableWords[i].length === chosenWordLength) {
                    availableWordsByChosenLenght.push(availableWords[i]);
                }
            }

            return availableWordsByChosenLenght[
                Math.floor(
                    Math.random() * (availableWordsByChosenLenght.length - 1)
                )
            ];
        }
    );
    getGenerateRandomWord$ = this.ngRxSelect$(this.generateRandomWord);

    //vissza adja a helytelen karaktereket
    private selectInCorrectLetters = createSelector(
        this.selectWord,
        this.selectAttemptedLetters,
        (word, attemptedLetters) => {
            return attemptedLetters.filter(
                (attemptedLetter) => !word.includes(attemptedLetter)
            );
        }
    );
    getSelectInCorrectLetters$ = this.ngRxSelect$(this.selectInCorrectLetters);

    // TODO írjatok egy selectort, ami az eltalált helyes betűket adja vissza tömbként
    private selectCorrectLetters = createSelector(
        this.selectWord,
        this.selectAttemptedLetters,
        (word, attemptedLetters) => {
            return attemptedLetters.filter(
                (attemptedLetter) => word.includes(attemptedLetter)
            );
        }
    );
    getSelectedCorrectLetters$ = this.ngRxSelect$(this.selectCorrectLetters);
    
    // vissza adja a szót az eltalát karakterekkel
    private selectCorrectLettersInWord = createSelector(
        this.selectWord,
        this.selectCorrectLetters,
        (word, correctedLetters) => {
            let selectedCorrectCharacters: string[] = [];

            for (let i = 0; i < word.length; i++) {
                if (correctedLetters.includes(word[i]))
                    selectedCorrectCharacters.push(word[i]);
                else selectedCorrectCharacters.push('');
            }

            return selectedCorrectCharacters;
        }
    );
    getSelectCorrectLettersInWord$ = this.ngRxSelect$(this.selectCorrectLettersInWord);

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
