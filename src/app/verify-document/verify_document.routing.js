"use strict";
var router_1 = require("@angular/router");
var list_documents_component_1 = require("./list_documents.component");
var auth_guard_service_1 = require("../authen/auth-guard.service");
var search_ducument_component_1 = require("./search/search_ducument.component");
var agreement_component_1 = require("./agreement/agreement.component");
var checklist_page_component_1 = require("./agreement/checklist-page.component");
/**
 * Created by pramoth on 8/31/2016 AD.
 */
exports.routing = router_1.RouterModule.forChild([
    {
        path: 'verify-documents', component: list_documents_component_1.ListDocumentComponent, canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: 'search',
                component: search_ducument_component_1.SearchComponent
            },
            {
                path: 'agreement/:reqId',
                component: agreement_component_1.AgreementComponent
            },
            {
                path: 'checklist/:reqNo/:docType',
                component: checklist_page_component_1.CheckListPageComponent
            }
        ]
    }
]);
//# sourceMappingURL=verify_document.routing.js.map