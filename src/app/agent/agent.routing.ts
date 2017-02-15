import {RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AgentComponent} from "./agent.component";
/**
 * Created by pramoth on 8/31/2016 AD.
 */
export const routing : ModuleWithProviders = RouterModule.forChild([
    {path: 'agent', component: AgentComponent,outlet:'dialog'}
]);
