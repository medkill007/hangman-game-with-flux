import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { PickWordComponent } from './page/view/pick-word/pick-word.component';
import { TheGameComponent } from './page/view/the-game/the-game.component';
import { TutorialComponent } from './page/view/tutorial/tutorial.component';

const routes: Routes = [
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: '',
                component: TutorialComponent,
            },
            {
                path: 'pick-word',
                component: PickWordComponent,
            },
            {
                path: 'the-game',
                component: TheGameComponent,
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
