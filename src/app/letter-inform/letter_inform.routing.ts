import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SearchLetterInformComponent} from "./search_letter_inform.component";

export const routing : ModuleWithProviders = RouterModule.forChild([
    {path: 'search', component: SearchLetterInformComponent}
]);
