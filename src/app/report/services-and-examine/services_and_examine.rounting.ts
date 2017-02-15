import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SearchServicesAndExamineStatistics} from "./search_services_and_examine_statistics_component";
import {ListServiceAndExamineComponent} from "./list_service.component";
/**
 * Created by neng on 10/12/2559.
 */
export const routing:ModuleWithProviders = RouterModule.forChild([
    {path: 'search', component: ListServiceAndExamineComponent},
]);