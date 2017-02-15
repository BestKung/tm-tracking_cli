"use strict";
var router_1 = require("@angular/router");
var list_follow_trademark_component_1 = require("./list_follow_trademark.component");
var detail_of_operation_component_1 = require("./detail/detail_of_operation.component");
/**
 * Created by neng on 9/12/2559.
 */
exports.routing = router_1.RouterModule.forChild([
    { path: '', component: list_follow_trademark_component_1.ListFollowTradeMarkComponent },
    { path: 'detail/:trNo', component: detail_of_operation_component_1.DetailOfOperation },
]);
//# sourceMappingURL=trademark.routing.js.map