"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const $ = require("cheerio");
const common_1 = require("@nestjs/common");
let HomeLoader = class HomeLoader {
    response() {
        const url = 'http://www.nhaccuatui.com';
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                resolve($(body));
            });
        });
    }
};
HomeLoader = __decorate([
    common_1.Component()
], HomeLoader);
exports.HomeLoader = HomeLoader;
//# sourceMappingURL=home..loader.js.map