import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HangmanQuery } from 'src/app/store/hangman.query';
import { HangmanService } from 'src/app/store/hangman.service';

@Component({
    selector: 'app-the-game',
    templateUrl: './the-game.component.html',
    styleUrls: ['./the-game.component.scss'],
})
export class TheGameComponent implements OnInit {
    getSelectWord!: string[];
    clicked = false;
    //prettier-ignore
    allEnglishWord = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    gameover: boolean = false;
    win: boolean = false;
    
    private onDestroy$ = new Subject<void>();
    
    constructor(
        public readonly hangmanQuery: HangmanQuery,
        public readonly hangmanService: HangmanService
    ) {}

    ngOnInit(): void {
        this.hangmanQuery.getSelectWord$.pipe(takeUntil(this.onDestroy$)).subscribe((resp) => {
            this.getSelectWord = resp.split('');
        });
        this.hangmanService.resetAttemptedLetters();

        /* console.log the word  */
        this.hangmanQuery.getSelectWord$.pipe(takeUntil(this.onDestroy$)).subscribe((word) => console.log(word));

        this.hangmanQuery.getSelectCorrectLettersInWord$.pipe(takeUntil(this.onDestroy$)).subscribe((word) => {
            this.getSelectWord = word;

            //is winable
            if (!word.includes('')) {
                this.win = true;
            }
        });
        // is gameover
        this.hangmanQuery.getSelectInCorrectLetters$.pipe(takeUntil(this.onDestroy$)).subscribe((resp) => {
            if (resp.length >= 10) {
                this.gameover = true;
            }
        });

        /* this.hangmanQuery.getSelectInCorrectLetters$.subscribe((word) => console.log(word));
        this.hangmanQuery.getSelectedCorrectLetters$.subscribe((word) => console.log(word)); */
    }

    isCharacterInSelectedWord(selectedCharacter: string) {
        this.hangmanService.selectedAttemptedCharacter(selectedCharacter);
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    actionMethod(event: any) {
        event.target.disabled = true;
    }
}
