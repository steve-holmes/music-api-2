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
const song_repository_1 = require("../../song/song.repository");
const song_api_1 = require("./song.api");
const song_loader_1 = require("./song.loader");
const song_helper_1 = require("../../song/song.helper");
let SongService = class SongService {
    constructor(songRepository, songAPI, songLoader) {
        this.songRepository = songRepository;
        this.songAPI = songAPI;
        this.songLoader = songLoader;
    }
    getSongs(category, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = yield this.songRepository.getCategory(song_helper_1.SongHelper.getLink(category));
            const url = this.songAPI.getURL(category, page);
            const songs = (yield this.songLoader.response(url));
            this.songRepository.saveSongs(songs);
            return {
                category: name,
                songs: song_helper_1.SongHelper.songs(songs)
            };
        });
    }
};
SongService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [song_repository_1.SongRepository,
        song_api_1.SongAPI,
        song_loader_1.SongLoader])
], SongService);
exports.SongService = SongService;
//# sourceMappingURL=song.service.js.map