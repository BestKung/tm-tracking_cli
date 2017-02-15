import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListAnnouncementComponent} from "./list_annoucement.component";
/**
 * Created by neng on 10/12/2559.
 */
export const routing:ModuleWithProviders = RouterModule.forChild(
    [
        {path: 'search', component: ListAnnouncementComponent}
    ]
);