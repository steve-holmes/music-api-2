"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const video_controller_1 = require("./video.controller");
const video_service_1 = require("./video.service");
const video_repository_1 = require("../../video/video.repository");
const video_api_1 = require("./video.api");
const video_loader_1 = require("./video.loader");
let VideosModule = class VideosModule {
};
VideosModule = __decorate([
    common_1.Shared(),
    common_1.Module({
        controllers: [video_controller_1.VideoController],
        components: [video_service_1.VideoService, video_repository_1.VideoRepository, video_api_1.VideoAPI, video_loader_1.VideoLoader]
    })
], VideosModule);
exports.VideosModule = VideosModule;
//# sourceMappingURL=video.module.js.map