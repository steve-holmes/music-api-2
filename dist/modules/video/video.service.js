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
const video_loader_1 = require("./video.loader");
const video_repository_1 = require("./video.repository");
const video_helper_1 = require("./video.helper");
let VideoService = class VideoService {
    constructor(videoLoader, videoRepository) {
        this.videoLoader = videoLoader;
        this.videoRepository = videoRepository;
    }
    getVideo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let video = yield this.videoRepository.findVideo(id);
            video = yield this.videoLoader.response(video.url);
            this.videoRepository.saveVideos(video.videos.map(({ title, info }) => ({ name: title, url: info })));
            this.videoRepository.saveVideos(video.singers);
            return {
                track: video.track,
                videos: video.videos.map(video => ({
                    id: video.key,
                    name: video.title,
                    singer: video.singer,
                    avatar: video.image,
                    time: video.time
                })),
                singers: video_helper_1.VideoHelper.videos(video.singers)
            };
        });
    }
};
VideoService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [video_loader_1.VideoLoader,
        video_repository_1.VideoRepository])
], VideoService);
exports.VideoService = VideoService;
//# sourceMappingURL=video.service.js.map