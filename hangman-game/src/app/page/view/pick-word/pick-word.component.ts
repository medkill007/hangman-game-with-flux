import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { HangmanQuery } from 'src/app/store/hangman.query';
import { HangmanService } from 'src/app/store/hangman.service';

@Component({
    selector: 'app-pick-word',
    templateUrl: './pick-word.component.html',
    styleUrls: ['./pick-word.component.scss'],
})
export class PickWordComponent implements OnInit {
    availableWordsLengths!: number[];

    constructor(
        public readonly hangmanQuery: HangmanQuery,
        public readonly hangmanService: HangmanService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.hangmanQuery.getAvailableWordsLengths$.subscribe((resp) => {
            this.availableWordsLengths = resp;
        });
    }

    selectedRandomWord(){
        const randomNum = Math.floor(Math.random() * Math.abs(this.availableWordsLengths.length-1));

        this.selectedWordLength(this.availableWordsLengths[randomNum]);
    }
    
    selectedWordLength(chosenWordLength: number){
        this.hangmanService.updateSelectedWordLength(chosenWordLength);
        
        this.hangmanQuery.getGenerateRandomWord$.pipe(first()).subscribe((resp) => {
            this.hangmanService.updateCurrentWord(resp);
        });
        
        this.router.navigate(['the-game']);
    }
}
