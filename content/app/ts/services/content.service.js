"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ContentService = (function () {
    function ContentService(http) {
        this.http = http;
    }
    ContentService.prototype.getContent = function () {
        this.http.post('/test', null);
        return {
            "button1": {
                "text": "Google",
                "url": "http://www.google.com"
            }
        };
    };
    ContentService.prototype.getManifest = function () {
        return [{
                "layout": "full",
                "sections": [{
                        "components": [{
                                "name": "button",
                                "content": "button1"
                            }]
                    }]
            }];
    };
    return ContentService;
}());
ContentService = __decorate([
    core_1.Injectable()
], ContentService);
exports.ContentService = ContentService;
