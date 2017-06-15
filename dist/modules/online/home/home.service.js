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
const playlist_helper_1 = require("../../playlist/playlist.helper");
const video_helper_1 = require("../../video/video.helper");
const topic_helper_1 = require("../../topic/topic.helper");
const song_helper_1 = require("../../song/song.helper");
let HomeService = class HomeService {
    constructor(homeLoader, pageParser, playlistParser, songParser, videoParser, topicParser, filmParser, playlistRepository, songRepository, videoRepository, topicRepository) {
        this.homeLoader = homeLoader;
        this.pageParser = pageParser;
        this.playlistParser = playlistParser;
        this.songParser = songParser;
        this.videoParser = videoParser;
        this.topicParser = topicParser;
        this.filmParser = filmParser;
        this.playlistRepository = playlistRepository;
        this.songRepository = songRepository;
        this.videoRepository = videoRepository;
        this.topicRepository = topicRepository;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const $body = yield this.homeLoader.response();
            const pages = this.pageParser.parse($body);
            const playlists = this.playlistParser.parse($body);
            const videos = this.videoParser.parse($body);
            const films = this.filmParser.parse($body);
            const topics = this.topicParser.parse($body);
            const songs = this.songParser.parse($body);
            this.playlistRepository.savePlaylists(pages);
            this.playlistRepository.savePlaylists(playlists);
            this.videoRepository.saveVideos(videos);
            this.videoRepository.saveVideos(films);
            this.topicRepository.saveTopics(topics);
            this.songRepository.saveSongs(songs);
            return {
                pages: playlist_helper_1.PlaylistHelper.playlists(pages),
                playlists: playlist_helper_1.PlaylistHelper.playlists(playlists),
                videos: video_helper_1.VideoHelper.videos(videos),
                films: video_helper_1.VideoHelper.videos(films),
                topics: topic_helper_1.TopicHelper.topics(topics),
                songs: song_helper_1.SongHelper.songs(songs)
            };
        });
    }
};
HomeService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [home__loader_1.HomeLoader,
        page_parser_1.PageParser,
        playlist_parser_1.PlaylistParser,
        song_parser_1.SongParser,
        video_parser_1.VideoParser,
        topic_parser_1.TopicParser,
        film_parser_1.FilmParser,
        playlist_repository_1.PlaylistRepository,
        song_repository_1.SongRepository,
        video_repository_1.VideoRepository,
        topic_repository_1.TopicRepository])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map