import { Component, OnInit } from '@angular/core';
import { HangmanQuery } from 'src/app/store/hangman.query';
import { HangmanService } from 'src/app/store/hangman.service';

//import { default as hangmanWords } from 'src/assets/hangman_words.json';

@Component({
    selector: 'app-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
    constructor(
        public readonly hangmanService: HangmanService,
        public readonly hangmanQuery: HangmanQuery
    ) {}

    ngOnInit(): void {
        this.hangmanService.addNewWord(['asd', 'béla', 'alma']);



        this.hangmanQuery.getAvailableWordsLengths$.subscribe((resp) => {
            console.log(resp);
        });
    }
}
