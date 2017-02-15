"use strict";
var router_1 = require("@angular/router");
var list_cancel_registration_component_1 = require("./list_cancel_registration.component");
var cancel_operation_details_component_1 = require("./cancel-operation-details/cancel_operation_details.component");
/**
 * Created by neng on 9/12/2559.
 */
exports.routing = router_1.RouterModule.forChild([
    { path: '', component: list_cancel_registration_component_1.ListCancelRegistrationComponent },
    { path: 'detail/:trNo', component: cancel_operation_details_component_1.CancelOperationDetailsComponent }
]);
//# sourceMappingURL=cancel-reg.routing.js.map