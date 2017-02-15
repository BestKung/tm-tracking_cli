"use strict";
var router_1 = require("@angular/router");
var list_acknowledgement_component_1 = require("./list_acknowledgement.component");
var acknowledgement_component_1 = require("./acknowledgement.component");
exports.routing = router_1.RouterModule.forChild([
    {
        path: 'list-acknowledgement',
        component: list_acknowledgement_component_1.ListAcknowledgement,
        children: [
            {
                path: 'search',
                component: acknowledgement_component_1.AcknowledgementComponent
            }
        ]
    }
]);
//# sourceMappingURL=acknowledgement.routing.js.map