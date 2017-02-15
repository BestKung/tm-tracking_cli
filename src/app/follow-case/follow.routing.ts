import {ModuleWithProviders} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ListFollowComponent} from "./list_follow.component";

export const routing:ModuleWithProviders = RouterModule.forChild([
    {path: '', component: ListFollowComponent},
    // {path: 'floor3', component: ListFollowFloor3Component},
    {path: 'trademark', loadChildren: 'app/follow-case/follow-trademark/trademark.module#TrademarkModule'},
    {path: 'change', loadChildren: 'app/follow-case/follow-change/change.module#FollowChangeModule'},
    {path: 'transfer-legacy', loadChildren: 'app/follow-case/follow-transfer-legacy/transfer-legacy.module#TransferLegacyModule'},
    {path: 'renew', loadChildren: 'app/follow-case/follow-renew/renew.module#RenewModule'},
    {path: 'approve', loadChildren: 'app/follow-case/follow-approve/approve.module#ApproveModule'},
    {path: 'cancel-registration/search', loadChildren: 'app/follow-case/follow-cancel-registration/cancel-reg.module#CancelRegModule'}
]);
