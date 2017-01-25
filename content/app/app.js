"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.name = 'Angular';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "<h1>Hello {{name}}</h1>"
    })
], AppComponent);
exports.AppComponent = AppComponent;

"use strict";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule],
        declarations: [app_component_1.AppComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;

"use strict";
var ContentService = (function () {
    function ContentService(http) {
        this.http = http;
    }
    ContentService.prototype.getContent = function () {
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
exports.ContentService = ContentService;

"use strict";
var MetadataService = (function () {
    function MetadataService(http) {
        this.http = http;
    }
    MetadataService.prototype.getComponents = function () {
        return {
            "button": {
                "name": "Button",
                "properties": {
                    "text": { "type": "text" },
                    "url": { "type": "text" }
                }
            }
        };
    };
    return MetadataService;
}());
exports.MetadataService = MetadataService;
