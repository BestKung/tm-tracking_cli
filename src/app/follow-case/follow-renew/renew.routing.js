"use strict";
var router_1 = require("@angular/router");
var list_follow_renew_component_1 = require("./list_follow_renew.component");
var renew_operation_details_component_1 = require("./detail/renew_operation_details.component");
/**
 * Created by neng on 9/12/2559.
 */
exports.routing = router_1.RouterModule.forChild([
    { path: '', component: list_follow_renew_component_1.ListFollowRenewComponent },
    { path: 'detail/:trNo', component: renew_operation_details_component_1.RenewOperationalDetailComponent }
]);
//# sourceMappingURL=renew.routing.js.map