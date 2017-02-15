"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ReturnedRequest = (function () {
    function ReturnedRequest() {
    }
    return ReturnedRequest;
}());
exports.ReturnedRequest = ReturnedRequest;
var ReturnedRequestWithLetter = (function (_super) {
    __extends(ReturnedRequestWithLetter, _super);
    function ReturnedRequestWithLetter() {
        _super.apply(this, arguments);
        this.receivedMethod = false;
    }
    return ReturnedRequestWithLetter;
}(ReturnedRequest));
exports.ReturnedRequestWithLetter = ReturnedRequestWithLetter;
//# sourceMappingURL=return-request.js.map