"use strict";
var router_1 = require("@angular/router");
var list_follow_transfer_legacy_component_1 = require("./list_follow_transfer_legacy.component");
var transfer_operation_details_component_1 = require("./transfer-legacy-operation-details/transfer_operation_details.component");
/**
 * Created by neng on 9/12/2559.
 */
exports.routing = router_1.RouterModule.forChild([
    { path: '', component: list_follow_transfer_legacy_component_1.ListFollowTransferLegacy },
    { path: 'detail/:trNo', component: transfer_operation_details_component_1.TransferOperationalDetailComponent },
]);
//# sourceMappingURL=transfer-legacy.routing.js.map