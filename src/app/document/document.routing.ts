import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import {ListDocumentComponent} from "./list_document.component";
import {PrintReturnRequestComponent} from "./print_return_request.component";
import {AuthGuard} from "../authen/auth-guard.service";
export const routing: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'document', canActivate: [AuthGuard],
        component: ListDocumentComponent,
        children: [
            {
                path: 'return-request',
                component: PrintReturnRequestComponent
            }
        ]
    }
]);
