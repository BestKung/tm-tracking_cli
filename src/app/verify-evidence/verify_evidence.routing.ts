import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from "../authen/auth-guard.service";
import {AgreementComponent} from "./agreement/agreement.component";
import {ListEvidenceComponent} from "./list_evidence.component";
import {SearchComponent} from "./search/search_evidence.component";
import {CheckListPageComponent} from "./agreement/checklist_page.component";
/**
 * Created by pramoth on 8/31/2016 AD.
 */
export const routing : ModuleWithProviders = RouterModule.forChild([
    // {path: '', component: ListEvidenceComponent, canActivate: [AuthGuard]},
    // {path: 'search', component: SearchComponent},
    // {path: 'agreement', component: AgreementComponent},
    // {path: 'checklist/:formId',component: CheckListPageComponent}

    {
        path: 'verify-evidences', component: ListEvidenceComponent, canActivate: [AuthGuard],
        children: [
            {
                path: 'search',
                component: SearchComponent
            },
            {
                path: 'agreement',
                component: AgreementComponent
            },
            {
                path: 'checklist/:formId',
                component: CheckListPageComponent
            }
        ]
    }
]);
