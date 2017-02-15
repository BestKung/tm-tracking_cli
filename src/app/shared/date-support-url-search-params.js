"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require("@angular/http");
/**
 * Created by pramoth on 10/27/2016 AD.
 */
var DateSupportURLSearchParams = (function (_super) {
    __extends(DateSupportURLSearchParams, _super);
    function DateSupportURLSearchParams() {
        _super.apply(this, arguments);
    }
    DateSupportURLSearchParams.prototype.set = function (param, val) {
        if (val === void 0 || val === null) {
            this.delete(param);
            return;
        }
        var list = this.paramsMap.get(param) || [];
        list.length = 0;
        if (val['toISOString']) {
            list.push(val.toISOString());
        }
        else if ((typeof val) == 'number') {
            list.push(val + '');
        }
        else {
            list.push(val);
        }
        this.paramsMap.set(param, list);
    };
    return DateSupportURLSearchParams;
}(http_1.URLSearchParams));
exports.DateSupportURLSearchParams = DateSupportURLSearchParams;
//# sourceMappingURL=date-support-url-search-params.js.map