/**
 * Created by neng on 9/12/2559.
 */
import {NgModule} from "@angular/core";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {GTCalendarModule} from "../../component/datepicker/calendar";
import {routing} from "./trademark.routing";
import {NgSemanticModule} from "ng-semantic";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {ListFollowTradeMarkComponent} from "./list_follow_trademark.component";
import {DetailOfOperation} from "./detail/detail_of_operation.component";
import {TrademarkSearch} from "./trademark_search.component";
import {FollowTrademarkRestObjectService} from "../../shared/service/followtm-rest-obj.service";
import {DetailTrademarkButton} from "./detail_trademark_button";
''
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
        ListFollowTradeMarkComponent,
        DetailOfOperation,
        TrademarkSearch,
        DetailTrademarkButton
    ],
    providers: [
        FollowTrademarkRestObjectService,
    ]
})

export class TrademarkModule {

}