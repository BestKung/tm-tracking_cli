"use strict";
var router_1 = require("@angular/router");
var list_document_component_1 = require("./list_document.component");
var print_return_request_component_1 = require("./print_return_request.component");
var auth_guard_service_1 = require("../authen/auth-guard.service");
exports.routing = router_1.RouterModule.forChild([
    {
        path: 'document', canActivate: [auth_guard_service_1.AuthGuard],
        component: list_document_component_1.ListDocumentComponent,
        children: [
            {
                path: 'return-request',
                component: print_return_request_component_1.PrintReturnRequestComponent
            }
        ]
    }
]);
//# sourceMappingURL=document.routing.js.map