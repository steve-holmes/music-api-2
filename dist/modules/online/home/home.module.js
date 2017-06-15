"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const home_controller_1 = require("./home.controller");
const home_service_1 = require("./home.service");
const home__loader_1 = require("./home..loader");
const page_parser_1 = require("./page.parser");
const playlist_parser_1 = require("./playlist.parser");
const song_parser_1 = require("./song.parser");
const video_parser_1 = require("./video.parser");
const topic_parser_1 = require("./topic.parser");
const film_parser_1 = require("./film.parser");
const playlist_repository_1 = require("../../playlist/playlist.repository");
const song_repository_1 = require("../../song/song.repository");
const video_repository_1 = require("../../video/video.repository");
const topic_repository_1 = require("../../topic/topic.repository");
let HomeModule = class HomeModule {
};
HomeModule = __decorate([
    common_1.Shared(),
    common_1.Module({
        controllers: [home_controller_1.HomeController],
        components: [
            home_service_1.HomeService, home__loader_1.HomeLoader,
            page_parser_1.PageParser, playlist_parser_1.PlaylistParser, song_parser_1.SongParser, video_parser_1.VideoParser, topic_parser_1.TopicParser, film_parser_1.FilmParser,
            playlist_repository_1.PlaylistRepository, song_repository_1.SongRepository, video_repository_1.VideoRepository, topic_repository_1.TopicRepository
        ]
    })
], HomeModule);
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map