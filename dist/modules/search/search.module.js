"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const search_controller_1 = require("./search.controller");
const search_service_1 = require("./search.service");
const song_service_1 = require("./song.service");
const playlist_service_1 = require("./playlist.service");
const video_service_1 = require("./video.service");
const search_loader_1 = require("./search.loader");
const playlist_loader_1 = require("./playlist.loader");
const song_loader_1 = require("./song.loader");
const video_loader_1 = require("./video.loader");
const playlist_parser_1 = require("./playlist.parser");
const song_parser_1 = require("./song.parser");
const video_parser_1 = require("./video.parser");
let SearchModule = class SearchModule {
};
SearchModule = __decorate([
    common_1.Shared(),
    common_1.Module({
        controllers: [search_controller_1.SearchController],
        components: [
            search_service_1.SearchService, song_service_1.SongService, playlist_service_1.PlaylistService, video_service_1.VideoService,
            search_loader_1.SearchLoader, playlist_loader_1.PlaylistLoader, song_loader_1.SongLoader, video_loader_1.VideoLoader,
            playlist_parser_1.PlaylistParser, song_parser_1.SongParser, video_parser_1.VideoParser
        ]
    })
], SearchModule);
exports.SearchModule = SearchModule;
//# sourceMappingURL=search.module.js.map