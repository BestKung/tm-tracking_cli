import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AdministratorListComponent} from "./administrator_list.component";
import {DeadlinesSendDocument} from "./deadlines_send_document/deadlines_send_document.component";
import {NontificationPopulationDuedate} from "./nontification/population-duedate/population_duedate.component";
import {EffectivedateActFacilitateComponent} from "./effectivedate_act_facilitate/effectivedate_act_facilitate.component";
import {EvidenceComponent} from "./evidence/administrator_evidence.component";
import {ManageAct} from "./manage_act/manage_act.component";
import {EmailMessageComponent} from "./email_message/email_message.component";
import {InformMessageComponent} from "./inform_message/inform_message.component";
import {EmailTestComponent} from "./email_message/test/email_test.component";
import {ManageStopDurationComponent} from "./manage_stop_duration/menage_stop_duration.component";
import {CancellationComponent} from "./cancellation/cancellation.component";
import {StopDurationComponent} from "./stop_duration/stop_duration.component";
import {CancellationMatra40Component} from "./cancellation/matra40/matra40.component";
/**
 * Created by best on 10/9/2559.
 */
export const routing: ModuleWithProviders = RouterModule.forChild([
    {path: '', component: AdministratorListComponent},
    {path: 'evidence', component: EvidenceComponent},
    {path: 'deadlines-send-evidence', component: DeadlinesSendDocument},
    {path: 'nontification-population-duedate', component: NontificationPopulationDuedate},
    {path: 'effectivedate-act-facilitate', component: EffectivedateActFacilitateComponent},
    {path: 'manage-act', component: ManageAct},
    {path: 'email-message', component: EmailMessageComponent},
    {path: 'inform_message', component: InformMessageComponent},
    {path: 'test-email', component: EmailTestComponent},
    {path: 'manage-stop-duration', component: ManageStopDurationComponent},
    {path: 'cancellation-matra56', component: CancellationComponent},
    {path: 'stop-duration', component: StopDurationComponent},
    {path: 'cancellation-matra40', component: CancellationMatra40Component}
]);
