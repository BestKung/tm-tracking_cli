"use strict";
var router_1 = require("@angular/router");
var list_follow_component_1 = require("./list_follow.component");
exports.routing = router_1.RouterModule.forChild([
    { path: '', component: list_follow_component_1.ListFollowComponent },
    // {path: 'floor3', component: ListFollowFloor3Component},
    { path: 'trademark', loadChildren: 'app/follow-case/follow-trademark/trademark.module#TrademarkModule' },
    { path: 'change', loadChildren: 'app/follow-case/follow-change/change.module#FollowChangeModule' },
    { path: 'transfer-legacy', loadChildren: 'app/follow-case/follow-transfer-legacy/transfer-legacy.module#TransferLegacyModule' },
    { path: 'renew', loadChildren: 'app/follow-case/follow-renew/renew.module#RenewModule' },
    { path: 'approve', loadChildren: 'app/follow-case/follow-approve/approve.module#ApproveModule' },
    { path: 'cancel-registration/search', loadChildren: 'app/follow-case/follow-cancel-registration/cancel-reg.module#CancelRegModule' }
]);
//# sourceMappingURL=follow.routing.js.map