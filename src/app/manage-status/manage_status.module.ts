import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {NgSemanticModule} from "ng-semantic";
import {CalendarGTModule} from "../component/calendar/calendar_custom.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {routing} from "./manage_status.routing";
import {Matra56Component} from "./matra56/matra56.component";
import {ListManageStatusComponent} from "./list_manage_status";
import {Matra40Component} from "./matra40/matra40.component";
/**
 * Created by best on 15/12/2559.
 */
@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgSemanticModule,
        routing,
        CalendarGTModule,
        SharedModule
    ],
    declarations: [
        ListManageStatusComponent,
        Matra56Component,
        Matra40Component
    ]
})
export class ManageStatusModule {
}
