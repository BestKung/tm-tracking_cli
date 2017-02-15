"use strict";
var router_1 = require("@angular/router");
var list_timer_component_1 = require("./list_timer.component");
/**
 * Created by neng on 2/8/17.
 */
exports.routing = router_1.RouterModule.forChild([
    { path: '', component: list_timer_component_1.ListTimerComponent },
    { path: 'koh14', loadChildren: 'app/timer/koh14/koh14.module#TimerKoh14Module' },
    { path: 'kohs', loadChildren: 'app/timer/kohs/kohs.module#TimerKohsModule' }
]);
//# sourceMappingURL=timer.routing.js.map