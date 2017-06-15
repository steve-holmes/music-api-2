"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const online_module_1 = require("./online/online.module");
const category_module_1 = require("./category/category.module");
const playlist_module_1 = require("./playlist/playlist.module");
const song_module_1 = require("./song/song.module");
const video_module_1 = require("./video/video.module");
const topic_module_1 = require("./topic/topic.module");
const singer_module_1 = require("./singer/singer.module");
const rank_module_1 = require("./rank/rank.module");
const search_module_1 = require("./search/search.module");
let ApplicationModule = class ApplicationModule {
};
ApplicationModule = __decorate([
    common_1.Module({
        modules: [
            online_module_1.OnlineModule, category_module_1.CategoryModule,
            playlist_module_1.PlaylistModule, song_module_1.SongModule, video_module_1.VideoModule,
            topic_module_1.TopicModule, singer_module_1.SingerModule,
            rank_module_1.RankModule, search_module_1.SearchModule
        ]
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=app.module.js.map