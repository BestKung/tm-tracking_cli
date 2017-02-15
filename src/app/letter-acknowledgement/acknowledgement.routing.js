"use strict";
var router_1 = require("@angular/router");
var acknowledgement_component_1 = require("./acknowledgement.component");
var return_request_renew_component_1 = require("../letter-inform/return-request/return_request_renew.component");
exports.routing = router_1.RouterModule.forChild([
    { path: 'search', component: acknowledgement_component_1.AcknowledgementComponent },
    { path: 'return-request-renew/:letter-id', component: return_request_renew_component_1.ReturnRequestRenewComponent }
]);
//# sourceMappingURL=acknowledgement.routing.js.map