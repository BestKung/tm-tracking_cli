import {NgModule} from "@angular/core";
import {UpdateButtonComponent} from "./update_button.component";
import {FlattenStringListPipe} from "./pipes/flatten_string_list.pipe";
import {PaginationComponent} from "./paging/pagination.component";
import {CommonModule} from "@angular/common";
import {DeleteButtonComponent} from "./delete_button.component";
import {DateThaiTransformPipe} from "./pipes/date-transform.pipe";
import {ToastModule} from "ng2-toastr/ng2-toastr";
import {GTCalendarModule} from "../component/datepicker/calendar";
import {ErrorsComponent} from "./errors.component";
import {TumbonComponent} from "./tumbon.component";
import {ContractSearchComponent} from "./contract-search.component";
import {TagColoeFollowTrademarkComponent} from "./tag_collor_follow_teademark.component";
import {NgSemanticModule} from "ng-semantic";
import {ChartComponent} from "./chart.component";

let options:any = {
    animate: 'flyRight',
    positionClass: 'toast-bottom-right',
};

@NgModule({
    declarations: [
        UpdateButtonComponent,
        FlattenStringListPipe,
        PaginationComponent,
        DeleteButtonComponent,
        DateThaiTransformPipe ,
        ErrorsComponent,
        TumbonComponent,
        ContractSearchComponent,
        TagColoeFollowTrademarkComponent,
        ChartComponent],
    exports: [
        UpdateButtonComponent,
        FlattenStringListPipe,
        PaginationComponent,
        DeleteButtonComponent,
        DateThaiTransformPipe,
        GTCalendarModule,
        ErrorsComponent,
        TumbonComponent,
        ContractSearchComponent,
        TagColoeFollowTrademarkComponent,
        ChartComponent
    ],
    imports:[
        CommonModule,
        ToastModule.forRoot(options),
        GTCalendarModule,
        NgSemanticModule
    ],
    providers:[]
})
export class SharedModule {

}
