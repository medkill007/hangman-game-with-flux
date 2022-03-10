import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TutorialComponent } from './page/view/tutorial/tutorial.component';
import { PickWordComponent } from './page/view/pick-word/pick-word.component';
import { TheGameComponent } from './page/view/the-game/the-game.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    TutorialComponent,
    PickWordComponent,
    TheGameComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
