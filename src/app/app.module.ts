import {NgModule, LOCALE_ID} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {NgSemanticModule} from "ng-semantic";
import {AppComponent} from "./app.component";
import {routing} from "./app.routing";
import {AgentModule} from "./agent/agent.module";
import {HomeComponent} from "./home/home.component";
import {AuthenModule} from "./authen/authen.module";
import {ReportsModule} from "./report/reports.module";
import {AdministratorModule} from "./administrator/administrator.module";
import {DocumentModule} from "./document/document.module";
import {INTERCEPT_HTTP_PROVIDERS, InterceptHttp} from "./shared/intercept_http";
import {SharedModule} from "./shared/shared.module";
import {AcknowledgementModule} from "./letter-acknowledgement/acknowledgement.module";
import {PrintInformModule} from "./print-inform/print_inform.module";
import {LetterInformModule} from "./letter-inform/letter_inform.module";
import {VerifyEvidenceModule} from "./verify-evidence/verify_evidence.module";
import {CoreModule} from "./core/core.module";
import {Floor3Module} from "./follow-case/follow-floor3/floor3.module";
import {ManageStatusModule} from "./manage-status/manage_status.module";
import {TimerModule} from "./timer/timer.module";

@NgModule({
    providers: [
        { provide: LOCALE_ID, useValue: "th-TH"},
        ...INTERCEPT_HTTP_PROVIDERS
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        CoreModule.forRoot(),
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        NgSemanticModule,
        AgentModule,
        AuthenModule,
        ReportsModule,
        AdministratorModule,
        DocumentModule,
        SharedModule,
        PrintInformModule,
        AcknowledgementModule,
        LetterInformModule,
        VerifyEvidenceModule,
        Floor3Module,
        ManageStatusModule,
        TimerModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
