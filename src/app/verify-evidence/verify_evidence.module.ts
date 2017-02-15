/**
 * Created by pramoth on 8/31/2016 AD.
 */
import { NgModule } from "@angular/core";
import { routing } from "./verify_evidence.routing";
import { CommonModule } from "@angular/common";
import { NgSemanticModule } from "ng-semantic";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AgreementComponent } from "./agreement/agreement.component";
import { CalendarGTModule } from "../component/calendar/calendar_custom.component";
import { CheckListButtonComponent } from "./component/checklist-btn.component";
import { ListEvidenceComponent } from "./list_evidence.component";
import { SearchComponent } from "./search/search_evidence.component";
import { ChecklistTreeComponent } from "./agreement/checklist_tree.component";
import { CheckListTableComponent } from "./agreement/checklist_table";
import { CheckListPageComponent } from "./agreement/checklist_page.component";
import { RestObjectService } from "../core/rest_object.service";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {SharedModule} from "../shared/shared.module";
import {LocationAutocompleteService} from "../shared/service/location-autocomplete.service";
import {ContractAutoCompleteService} from "../shared/service/contract-autocomplete.service";
import {VerifyEvidenceRestObjectService} from "../shared/service/verify-evidence.rest-obj.service";
import {DropdownModule} from "primeng/components/dropdown/dropdown";

@NgModule({
    imports: [
        FormsModule,
        // HttpModule,
        CommonModule,
        NgSemanticModule,
        routing,
        CalendarModule,
        CalendarGTModule,
        SharedModule,
        ReactiveFormsModule,
        DropdownModule
    ],
    declarations: [
        SearchComponent,
        ListEvidenceComponent,
        AgreementComponent,
        CheckListButtonComponent,
        CheckListPageComponent,
        ChecklistTreeComponent,
        CheckListTableComponent
    ],
    providers: [
        RestObjectService,
        LocationAutocompleteService,
        ContractAutoCompleteService,
        VerifyEvidenceRestObjectService
    ]
})
export class VerifyEvidenceModule {

}
