import { Component, OnInit } from '@angular/core';
import { HangmanQuery } from 'src/app/store/hangman.query';

@Component({
    selector: 'app-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent {
    constructor(
        public readonly hangmanQuery: HangmanQuery,
    ) {}
}
