"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Created by pramoth on 10/25/2016 AD.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var http_status_bus_1 = require("./http_status_bus");
var InterceptHttp = (function (_super) {
    __extends(InterceptHttp, _super);
    function InterceptHttp(backend, defaultOptions, httpStatusBus) {
        _super.call(this, backend, defaultOptions);
        this.httpStatusBus = httpStatusBus;
    }
    InterceptHttp.prototype.request = function (url, options) {
        this.httpStatusBus.start.next(url);
        return this.intercept(_super.prototype.request.call(this, url, options));
    };
    InterceptHttp.prototype.get = function (url, options) {
        this.httpStatusBus.start.next(url);
        return this.intercept(_super.prototype.get.call(this, url, options));
    };
    InterceptHttp.prototype.post = function (url, body, options) {
        this.httpStatusBus.start.next(url);
        return this.intercept(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    InterceptHttp.prototype.put = function (url, body, options) {
        this.httpStatusBus.start.next(url);
        return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    InterceptHttp.prototype.delete = function (url, options) {
        this.httpStatusBus.start.next(url);
        return this.intercept(_super.prototype.delete.call(this, url, options));
    };
    InterceptHttp.prototype.patch = function (url, body, options) {
        this.httpStatusBus.start.next(url);
        return this.intercept(_super.prototype.patch.call(this, url, body, options));
    };
    InterceptHttp.prototype.head = function (url, options) {
        this.httpStatusBus.start.next(url);
        return this.intercept(_super.prototype.head.call(this, url, options));
    };
    InterceptHttp.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        return options;
    };
    InterceptHttp.prototype.intercept = function (observable) {
        var _this = this;
        return new Rx_1.Observable(function (responseObserver) {
            observable.subscribe(function (value) {
                _this.httpStatusBus.completed.next(value);
                responseObserver.next(value);
            }, function (error) {
                _this.httpStatusBus.error.next(error);
                try {
                    responseObserver.error(error);
                }
                catch (e) {
                    console.log(e);
                }
            }, function () {
                responseObserver.complete();
            });
        });
    };
    InterceptHttp = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.ConnectionBackend)),
        __param(1, core_1.Inject(http_1.RequestOptions)),
        __param(2, core_1.Inject(http_status_bus_1.HttpStatusBus)), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, http_status_bus_1.HttpStatusBus])
    ], InterceptHttp);
    return InterceptHttp;
}(http_1.Http));
exports.InterceptHttp = InterceptHttp;
exports.INTERCEPT_HTTP_PROVIDERS = [
    http_status_bus_1.HttpStatusBus,
    {
        provide: InterceptHttp,
        useFactory: function (backend, defaultOptions, pubsub) { return new InterceptHttp(backend, defaultOptions, pubsub); },
        deps: [http_1.XHRBackend, http_1.RequestOptions, http_status_bus_1.HttpStatusBus]
    }
];
//# sourceMappingURL=intercept_http.js.map