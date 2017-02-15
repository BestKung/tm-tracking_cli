/**
 * Created by neng on 9/12/2559.
 */
import {NgModule} from "@angular/core";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {GTCalendarModule} from "../../component/datepicker/calendar";
import {NgSemanticModule} from "ng-semantic";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {routing} from "./floor3.routing";
import {ListFollowFloor3Component} from "./list_follow_floor3.component";
import {ReturnRequestComponent} from "./return-request/return_request.component";
import {Floor3Search} from "./floor3_search.component";
import {Kor20Component} from "./component/kor20.component";
import {AbsenceEvidenceDetailComponent} from "./component/absence-evidence-detail.component";
import {SaveReturnDetailComponent} from "./component/save-return-detail.component";
import {DiscardRequestComponent} from "./component/discard-request.component";
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
        ListFollowFloor3Component,
        ReturnRequestComponent,
        Floor3Search,
        Kor20Component,
        AbsenceEvidenceDetailComponent,
        SaveReturnDetailComponent,
        DiscardRequestComponent,
    ]
})
export class Floor3Module {

}