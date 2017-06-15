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
const rank_loader_1 = require("./rank.loader");
const playlist_repository_1 = require("../playlist/playlist.repository");
const song_repository_1 = require("../song/song.repository");
const video_repository_1 = require("../video/video.repository");
const playlist_helper_1 = require("../playlist/playlist.helper");
const song_helper_1 = require("../song/song.helper");
const video_helper_1 = require("../video/video.helper");
let RankService = class RankService {
    constructor(rankLoader, playlistRepository, songRepository, videoRepository) {
        this.rankLoader = rankLoader;
        this.playlistRepository = playlistRepository;
        this.songRepository = songRepository;
        this.videoRepository = videoRepository;
    }
    getRanks(country) {
        return __awaiter(this, void 0, void 0, function* () {
            const rank = yield this.rankLoader.response(country);
            this.playlistRepository.savePlaylists(rank.playlists);
            this.songRepository.saveSongs(rank.songs);
            this.videoRepository.saveVideos(rank.videos);
            return {
                songs: song_helper_1.SongHelper.songs(rank.songs),
                playlists: playlist_helper_1.PlaylistHelper.playlists(rank.playlists),
                videos: video_helper_1.VideoHelper.videos(rank.videos)
            };
        });
    }
    getCountryName(country) {
        let name = '';
        if (country == 'nhac-viet') {
            name = 'Việt Nam';
        }
        else if (country == 'au-my') {
            name = 'Âu Mỹ';
        }
        else if (country == 'nhac-han') {
            name = 'Hàn Quốc';
        }
        return name;
    }
};
RankService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [rank_loader_1.RankLoader,
        playlist_repository_1.PlaylistRepository,
        song_repository_1.SongRepository,
        video_repository_1.VideoRepository])
], RankService);
exports.RankService = RankService;
//# sourceMappingURL=rank.service.js.map