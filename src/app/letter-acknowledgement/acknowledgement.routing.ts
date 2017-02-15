import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AcknowledgementComponent} from "./acknowledgement.component";
import {ReturnRequestRenewComponent} from "../letter-inform/return-request/return_request_renew.component";
export const routing: ModuleWithProviders = RouterModule.forChild([
    {path: 'search', component: AcknowledgementComponent},
    {path: 'return-request-renew/:letter-id',component: ReturnRequestRenewComponent}
]);
