"use strict";
var router_1 = require("@angular/router");
var list_operation_duration_component_1 = require("./list_operation_duration.component");
var operation_duration_detail_component_1 = require("./operation_duration_detail.component");
/**
 * Created by neng on 10/12/2559.
 */
exports.routing = router_1.RouterModule.forChild([
    { path: 'search', component: list_operation_duration_component_1.ListOperationDurationComponent },
    { path: 'detail/:trNo/:formType', component: operation_duration_detail_component_1.OperationDurationDetailComponent },
]);
//# sourceMappingURL=operation_duration.routing.js.map