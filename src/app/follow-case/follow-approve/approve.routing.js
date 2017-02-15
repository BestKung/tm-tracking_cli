"use strict";
var router_1 = require("@angular/router");
var list_follow_approve_component_1 = require("./list_follow_approve.component");
var approve_operation_details_component_1 = require("./approve-operation-details/approve_operation_details.component");
/**
 * Created by neng on 9/12/2559.
 */
exports.routing = router_1.RouterModule.forChild([
    { path: '', component: list_follow_approve_component_1.ListFollowApproveComponent },
    { path: 'detail/:trNo', component: approve_operation_details_component_1.ApproveOperationDetailsComponent }
]);
//# sourceMappingURL=approve.routing.js.map