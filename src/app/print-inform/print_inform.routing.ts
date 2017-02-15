import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListInformComponent} from "./list_inform.component";
import {SearchInformComponent} from "./search_inform.component";
import {PrintBookInformComponent} from "./print_book_inform/print_book_inform.component";
/**
 * Created by pramoth on 9/1/2016 AD.
 */
export const routing:ModuleWithProviders = RouterModule.forChild([
    {path: '', component: ListInformComponent},
    {path: 'search', component: SearchInformComponent},
    {path: 'print', component: PrintBookInformComponent}
]);
