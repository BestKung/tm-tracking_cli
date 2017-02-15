"use strict";
var list_manage_status_1 = require("./list_manage_status");
var router_1 = require("@angular/router");
var matra56_component_1 = require("./matra56/matra56.component");
var matra40_component_1 = require("./matra40/matra40.component");
/**
 * Created by best on 15/12/2559.
 */
exports.routing = router_1.RouterModule.forChild([
    {
        path: 'manage-status', component: list_manage_status_1.ListManageStatusComponent,
        children: [
            { path: 'matra56', component: matra56_component_1.Matra56Component },
            { path: 'matra40', component: matra40_component_1.Matra40Component }
        ]
    }
]);
//# sourceMappingURL=manage_status.routing.js.map