import { Component, OnInit } from '@angular/core';
import { HangmanQuery } from 'src/app/store/hangman.query';

@Component({
    selector: 'app-pick-word',
    templateUrl: './pick-word.component.html',
    styleUrls: ['./pick-word.component.scss'],
})
export class PickWordComponent implements OnInit {
    constructor(
        public readonly hangmanQuery: HangmanQuery,
    ) {}

    ngOnInit(): void {
        /* console.log(this.hangmanQuery.getAvailableWordsLengths$); */
        this.hangmanQuery.getAvailableWordsLengths$.subscribe((resp) => {
            console.log(resp);
        });
    }
}
