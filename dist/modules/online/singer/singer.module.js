"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const singer_controller_1 = require("./singer.controller");
const singer_service_1 = require("./singer.service");
const singer_loader_1 = require("./singer.loader");
const singer_api_1 = require("./singer.api");
const singer_repository_1 = require("../../singer/singer.repository");
let SingersModule = class SingersModule {
};
SingersModule = __decorate([
    common_1.Shared(),
    common_1.Module({
        controllers: [singer_controller_1.SingerController],
        components: [singer_service_1.SingerService, singer_loader_1.SingerLoader, singer_api_1.SingerAPI, singer_repository_1.SingerRepository]
    })
], SingersModule);
exports.SingersModule = SingersModule;
//# sourceMappingURL=singer.module.js.map