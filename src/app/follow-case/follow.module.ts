import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, Jsonp} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {routing} from "./follow.routing";
import {NgModule} from "@angular/core";
import {ListFollowComponent} from "./list_follow.component";
import {Legend2Component} from "./legends/legend2/legend2_component";
import {Legend1Component} from "./legends/legend1/legend1_component";
import {Legend3Component} from "./legends/legend3/legend3_component";
import {Legend4Component} from "./legends/legend4/legend4_component";
import {Legend5Component} from "./legends/legend5/legend5_component";
import {SharedModule} from "../shared/shared.module";
import {GTCalendarModule} from "../component/datepicker/calendar";

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgSemanticModule,
        routing,
        GTCalendarModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        ListFollowComponent,
        Legend2Component,
        Legend1Component,
        Legend3Component,
        Legend4Component,
        Legend5Component,
    ],
    providers: [
        Jsonp
    ]
})
export class FollowModule {
}

