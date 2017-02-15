"use strict";
var router_1 = require("@angular/router");
var list_inform_component_1 = require("./list_inform.component");
var search_inform_component_1 = require("./search_inform.component");
var print_book_inform_component_1 = require("./print_book_inform/print_book_inform.component");
/**
 * Created by pramoth on 9/1/2016 AD.
 */
exports.routing = router_1.RouterModule.forChild([
    { path: '', component: list_inform_component_1.ListInformComponent },
    { path: 'search', component: search_inform_component_1.SearchInformComponent },
    { path: 'print', component: print_book_inform_component_1.PrintBookInformComponent }
]);
//# sourceMappingURL=print_inform.routing.js.map