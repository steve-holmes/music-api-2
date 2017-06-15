"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const home_module_1 = require("./home/home.module");
const playlist_module_1 = require("./playlist/playlist.module");
const song_module_1 = require("./song/song.module");
const video_module_1 = require("./video/video.module");
const singer_module_1 = require("./singer/singer.module");
let OnlineModule = class OnlineModule {
};
OnlineModule = __decorate([
    common_1.Shared(),
    common_1.Module({
        modules: [home_module_1.HomeModule, playlist_module_1.PlaylistsModule, song_module_1.SongsModule, video_module_1.VideosModule, singer_module_1.SingersModule]
    })
], OnlineModule);
exports.OnlineModule = OnlineModule;
//# sourceMappingURL=online.module.js.map