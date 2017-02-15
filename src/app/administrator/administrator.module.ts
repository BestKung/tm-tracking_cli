/**
 * Created by best on 10/9/2559.
 */
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic/ng-semantic";
import {routing} from "./administrator.routing";
import {AdministratorListComponent} from "./administrator_list.component";
import {DeadlinesSendDocument} from "./deadlines_send_document/deadlines_send_document.component";
import {NontificationPopulationDuedate} from "./nontification/population-duedate/population_duedate.component";
import {EffectivedateActFacilitateComponent} from "./effectivedate_act_facilitate/effectivedate_act_facilitate.component";
import {SharedModule} from "../shared/shared.module";
import {ManageAct} from "./manage_act/manage_act.component";
import {EvidenceTableComponent} from "./evidence/evidence_table.component";
import {EvidenceTreeComponent} from "./evidence/evidence_tree.component";
import {EmailMessageComponent} from "./email_message/email_message.component";
import {MapMessageButtonComponent} from "./email_message/map_message_button.component";
import {InformMessageComponent} from "./inform_message/inform_message.component";
import {EmailTestComponent} from "./email_message/test/email_test.component";
import {GTCalendarModule} from "../component/datepicker/calendar";
import {ManageStopDurationComponent} from "./manage_stop_duration/menage_stop_duration.component";
import {CancellationComponent} from "./cancellation/cancellation.component";
import {EvidenceComponent} from "./evidence/administrator_evidence.component";
import {StopDurationComponent} from "./stop_duration/stop_duration.component";
import {CancellationMatra40Component} from "./cancellation/matra40/matra40.component";

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgSemanticModule,
        routing,
        GTCalendarModule,
        SharedModule
    ],
    declarations: [
        AdministratorListComponent,
        EvidenceComponent,
        DeadlinesSendDocument,
        NontificationPopulationDuedate,
        EffectivedateActFacilitateComponent,
        ManageAct,
        EvidenceTableComponent,
        EvidenceTreeComponent,
        EmailMessageComponent,
        MapMessageButtonComponent,
        InformMessageComponent,
        EmailTestComponent,
        ManageStopDurationComponent,
        CancellationComponent,
        StopDurationComponent,
        CancellationMatra40Component
    ]
})
export class AdministratorModule {
}
