"use strict";
var router_1 = require("@angular/router");
var list_follow_change_component_1 = require("./list_follow_change.component");
var change_operational_detail_component_1 = require("./detail/change_operational_detail.component");
/**
 * Created by neng on 9/12/2559.
 */
exports.routing = router_1.RouterModule.forChild([
    { path: '', component: list_follow_change_component_1.ListFollowChangeComponent },
    { path: 'detail/:trNo', component: change_operational_detail_component_1.ChangeOperationalDetailComponent },
]);
//# sourceMappingURL=change.routing.js.map