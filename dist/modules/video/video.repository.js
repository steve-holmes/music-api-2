"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const video_helper_1 = require("./video.helper");
const category_1 = require("../../models/category");
const db = require("../../models/models");
const Video = db.Video;
let VideoRepository = class VideoRepository extends category_1.Category {
    getCategory(category) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super("getCategory").call(this, 'video', category);
        });
    }
    saveVideos(videos) {
        const records = videos.map(video => ({
            name: video_helper_1.VideoHelper.getId(video.url),
            url: video.url
        }));
        for (let record of records) {
            Video.findOne({ where: { name: record.name } }).then(foundedRecord => {
                if (foundedRecord == null) {
                    Video.create({ name: record.name, url: record.url }).then(createdRecord => {
                        if (createdRecord == null) {
                            throw Error("Video Creation Error");
                        }
                        console.log(`Create video: (${createdRecord.name}, ${createdRecord.url})`);
                    });
                    return;
                }
                foundedRecord.update({ url: record.url }, { where: { name: record.name } }).then(updatedRecord => {
                    if (updatedRecord == null) {
                        throw Error("Video Updating Error");
                    }
                    console.log(`Update video: (${updatedRecord.name}, ${updatedRecord.url})`);
                });
            });
        }
    }
    findVideo(id) {
        return Video.findOne({ where: { name: id } });
    }
};
VideoRepository = __decorate([
    common_1.Component()
], VideoRepository);
exports.VideoRepository = VideoRepository;
//# sourceMappingURL=video.repository.js.map