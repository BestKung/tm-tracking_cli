import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {NgSemanticModule} from "ng-semantic";
import {AgentComponent} from "./agent.component";
import {routing} from "./agent.routing";
import {CalendarGTModule} from "../component/calendar/calendar_custom.component";
/**
 * Created by pramoth on 8/31/2016 AD.
 */
@NgModule({
    imports: [FormsModule, HttpModule, CommonModule, NgSemanticModule,routing,CalendarGTModule],
    declarations: [AgentComponent]
})
export class AgentModule {

}
