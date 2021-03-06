"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const video_repository_1 = require("../../video/video.repository");
const video_api_1 = require("./video.api");
const video_loader_1 = require("./video.loader");
const video_helper_1 = require("../../video/video.helper");
let VideoService = class VideoService {
    constructor(videoRepository, videoAPI, videoLoader) {
        this.videoRepository = videoRepository;
        this.videoAPI = videoAPI;
        this.videoLoader = videoLoader;
    }
    getVideos(category, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = yield this.videoRepository.getCategory(video_helper_1.VideoHelper.getLink(category));
            const url = this.videoAPI.getURL(category, page);
            const videos = (yield this.videoLoader.response(url));
            this.videoRepository.saveVideos(videos);
            return {
                category: name,
                videos: video_helper_1.VideoHelper.videos(videos)
            };
        });
    }
};
VideoService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [video_repository_1.VideoRepository,
        video_api_1.VideoAPI,
        video_loader_1.VideoLoader])
], VideoService);
exports.VideoService = VideoService;
//# sourceMappingURL=video.service.js.map