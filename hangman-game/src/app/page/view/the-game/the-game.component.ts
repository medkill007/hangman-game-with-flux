import { Component, OnInit } from '@angular/core';
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

    constructor(
        public readonly hangmanQuery: HangmanQuery,
        public readonly hangmanService: HangmanService
    ) {}

    ngOnInit(): void {
        this.hangmanQuery.getSelectWord$.subscribe((resp) => {
            this.getSelectWord = resp.split('');
        });
        this.hangmanService.resetAttemptedLetters();

        /* console.log the word  */
        this.hangmanQuery.getSelectWord$.subscribe((word) => console.log(word));
        /* this.hangmanQuery.getSelectAttemptedLetters$.subscribe((word) =>
            console.log(word)
        ); */
        this.hangmanQuery.getSelectCorrectLetters$.subscribe((word) => this.getSelectWord = word);
    }

    isCharacterInSelectedWord(selectedCharacter: string) {
        this.hangmanService.selectedAttemptedCharacter(selectedCharacter);
    }

    actionMethod(event: any) {
        event.target.disabled = true;
    }
}
