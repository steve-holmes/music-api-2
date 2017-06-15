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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const search_service_1 = require("./search.service");
const song_service_1 = require("./song.service");
const playlist_service_1 = require("./playlist.service");
const video_service_1 = require("./video.service");
let SearchController = class SearchController {
    constructor(searchService, songService, playlistService, videoService) {
        this.searchService = searchService;
        this.songService = songService;
        this.playlistService = playlistService;
        this.videoService = videoService;
    }
    search(response, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.searchService.search(query);
            return response.status(common_1.HttpStatus.OK).json({ data });
        });
    }
    searchSongs(response, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield this.songService.search(query);
            return response.status(common_1.HttpStatus.OK).json({ data: songs });
        });
    }
    searchPlaylists(response, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const playlists = yield this.playlistService.search(query);
            return response.status(common_1.HttpStatus.OK).json({ data: playlists });
        });
    }
    searchVideos(response, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const videos = yield this.videoService.search(query);
            return response.status(common_1.HttpStatus.OK).json({ data: videos });
        });
    }
};
__decorate([
    common_1.Get('/:query'),
    __param(0, common_1.Response()), __param(1, common_1.Param('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "search", null);
__decorate([
    common_1.Get('/songs/:query'),
    __param(0, common_1.Response()), __param(1, common_1.Param('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "searchSongs", null);
__decorate([
    common_1.Get('/playlists/:query'),
    __param(0, common_1.Response()), __param(1, common_1.Param('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "searchPlaylists", null);
__decorate([
    common_1.Get('/videos/:query'),
    __param(0, common_1.Response()), __param(1, common_1.Param('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "searchVideos", null);
SearchController = __decorate([
    common_1.Controller('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService,
        song_service_1.SongService,
        playlist_service_1.PlaylistService,
        video_service_1.VideoService])
], SearchController);
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map