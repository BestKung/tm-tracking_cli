/**
 * Created by neng on 9/12/2559.
 */
import {NgModule} from "@angular/core";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {GTCalendarModule} from "../../component/datepicker/calendar";
import {routing} from "./change.routing";
import {NgSemanticModule} from "ng-semantic";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {ListFollowChangeComponent} from "./list_follow_change.component";
import {FollowChangeRestObjectService} from "../../shared/service/followchange-rest-obj.service";
import {ChangeOperationalDetailComponent} from "./detail/change_operational_detail.component";
import {FollowChangeSearchComponent} from "./follow_change_search.component";
import {DetailChangeButtonComponent} from "./detail_change_button.component";
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
        ListFollowChangeComponent,
        ChangeOperationalDetailComponent,
        FollowChangeSearchComponent,
        DetailChangeButtonComponent
    ],
    providers: [
        FollowChangeRestObjectService
    ]
})

export class FollowChangeModule {

}