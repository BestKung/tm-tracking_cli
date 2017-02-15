"use strict";
var router_1 = require("@angular/router");
var auth_guard_service_1 = require("../authen/auth-guard.service");
var agreement_component_1 = require("./agreement/agreement.component");
var list_evidence_component_1 = require("./list_evidence.component");
var search_evidence_component_1 = require("./search/search_evidence.component");
var checklist_page_component_1 = require("./agreement/checklist_page.component");
/**
 * Created by pramoth on 8/31/2016 AD.
 */
exports.routing = router_1.RouterModule.forChild([
    // {path: '', component: ListEvidenceComponent, canActivate: [AuthGuard]},
    // {path: 'search', component: SearchComponent},
    // {path: 'agreement', component: AgreementComponent},
    // {path: 'checklist/:formId',component: CheckListPageComponent}
    {
        path: 'verify-evidences', component: list_evidence_component_1.ListEvidenceComponent, canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: 'search',
                component: search_evidence_component_1.SearchComponent
            },
            {
                path: 'agreement',
                component: agreement_component_1.AgreementComponent
            },
            {
                path: 'checklist/:formId',
                component: checklist_page_component_1.CheckListPageComponent
            }
        ]
    }
]);
//# sourceMappingURL=verify_evidence.routing.js.map