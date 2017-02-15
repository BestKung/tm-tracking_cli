"use strict";
var router_1 = require("@angular/router");
var administrator_list_component_1 = require("./administrator_list.component");
var deadlines_send_document_component_1 = require("./deadlines_send_document/deadlines_send_document.component");
var population_duedate_component_1 = require("./nontification/population-duedate/population_duedate.component");
var effectivedate_act_facilitate_component_1 = require("./effectivedate_act_facilitate/effectivedate_act_facilitate.component");
var administrator_evidence_component_1 = require("./evidence/administrator_evidence.component");
var manage_act_component_1 = require("./manage_act/manage_act.component");
var email_message_component_1 = require("./email_message/email_message.component");
var inform_message_component_1 = require("./inform_message/inform_message.component");
var email_test_component_1 = require("./email_message/test/email_test.component");
var menage_stop_duration_component_1 = require("./manage_stop_duration/menage_stop_duration.component");
var cancellation_component_1 = require("./cancellation/cancellation.component");
var stop_duration_component_1 = require("./stop_duration/stop_duration.component");
var matra40_component_1 = require("./cancellation/matra40/matra40.component");
/**
 * Created by best on 10/9/2559.
 */
exports.routing = router_1.RouterModule.forChild([
    { path: '', component: administrator_list_component_1.AdministratorListComponent },
    { path: 'evidence', component: administrator_evidence_component_1.EvidenceComponent },
    { path: 'deadlines-send-evidence', component: deadlines_send_document_component_1.DeadlinesSendDocument },
    { path: 'nontification-population-duedate', component: population_duedate_component_1.NontificationPopulationDuedate },
    { path: 'effectivedate-act-facilitate', component: effectivedate_act_facilitate_component_1.EffectivedateActFacilitateComponent },
    { path: 'manage-act', component: manage_act_component_1.ManageAct },
    { path: 'email-message', component: email_message_component_1.EmailMessageComponent },
    { path: 'inform_message', component: inform_message_component_1.InformMessageComponent },
    { path: 'test-email', component: email_test_component_1.EmailTestComponent },
    { path: 'manage-stop-duration', component: menage_stop_duration_component_1.ManageStopDurationComponent },
    { path: 'cancellation-matra56', component: cancellation_component_1.CancellationComponent },
    { path: 'stop-duration', component: stop_duration_component_1.StopDurationComponent },
    { path: 'cancellation-matra40', component: matra40_component_1.CancellationMatra40Component }
]);
//# sourceMappingURL=administrator.routing.js.map