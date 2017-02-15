"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var update_button_component_1 = require("./update_button.component");
var flatten_string_list_pipe_1 = require("./pipes/flatten_string_list.pipe");
var pagination_component_1 = require("./paging/pagination.component");
var common_1 = require("@angular/common");
var delete_button_component_1 = require("./delete_button.component");
var date_transform_pipe_1 = require("./pipes/date-transform.pipe");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var calendar_1 = require("../component/datepicker/calendar");
var errors_component_1 = require("./errors.component");
var tumbon_component_1 = require("./tumbon.component");
var contract_search_component_1 = require("./contract-search.component");
var tag_collor_follow_teademark_component_1 = require("./tag_collor_follow_teademark.component");
var ng_semantic_1 = require("ng-semantic");
var chart_component_1 = require("./chart.component");
var options = {
    animate: 'flyRight',
    positionClass: 'toast-bottom-right',
};
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                update_button_component_1.UpdateButtonComponent,
                flatten_string_list_pipe_1.FlattenStringListPipe,
                pagination_component_1.PaginationComponent,
                delete_button_component_1.DeleteButtonComponent,
                date_transform_pipe_1.DateThaiTransformPipe,
                errors_component_1.ErrorsComponent,
                tumbon_component_1.TumbonComponent,
                contract_search_component_1.ContractSearchComponent,
                tag_collor_follow_teademark_component_1.TagColoeFollowTrademarkComponent,
                chart_component_1.ChartComponent],
            exports: [
                update_button_component_1.UpdateButtonComponent,
                flatten_string_list_pipe_1.FlattenStringListPipe,
                pagination_component_1.PaginationComponent,
                delete_button_component_1.DeleteButtonComponent,
                date_transform_pipe_1.DateThaiTransformPipe,
                calendar_1.GTCalendarModule,
                errors_component_1.ErrorsComponent,
                tumbon_component_1.TumbonComponent,
                contract_search_component_1.ContractSearchComponent,
                tag_collor_follow_teademark_component_1.TagColoeFollowTrademarkComponent,
                chart_component_1.ChartComponent
            ],
            imports: [
                common_1.CommonModule,
                ng2_toastr_1.ToastModule.forRoot(options),
                calendar_1.GTCalendarModule,
                ng_semantic_1.NgSemanticModule
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map