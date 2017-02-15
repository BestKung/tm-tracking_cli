"use strict";
var router_1 = require("@angular/router");
var list_follow_floor3_component_1 = require("./list_follow_floor3.component");
var return_request_component_1 = require("./return-request/return_request.component");
/**
 * Created by neng on 9/12/2559.
 */
exports.routing = router_1.RouterModule.forChild([
    { path: 'follow/floor3', component: list_follow_floor3_component_1.ListFollowFloor3Component },
    { path: 'follow/floor3/return-request/:id', component: return_request_component_1.ReturnRequestComponent },
]);
//# sourceMappingURL=floor3.routing.js.map