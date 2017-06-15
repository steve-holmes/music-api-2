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
const playlist_helper_1 = require("./playlist.helper");
const category_1 = require("../../models/category");
const db = require("../../models/models");
const Playlist = db.Playlist;
let PlaylistRepository = class PlaylistRepository extends category_1.Category {
    getCategory(category) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super("getCategory").call(this, 'playlist', category);
        });
    }
    savePlaylists(playlists) {
        const records = playlists.map(playlist => ({
            name: playlist_helper_1.PlaylistHelper.getId(playlist.url),
            url: playlist.url
        }));
        for (let record of records) {
            Playlist.findOne({ where: { name: record.name } }).then(foundedRecord => {
                if (foundedRecord == null) {
                    Playlist.create({ name: record.name, url: record.url }).then(createdRecord => {
                        if (createdRecord == null) {
                            throw Error("Playlist Creation Error");
                        }
                        console.log(`Create playlist: (${createdRecord.name}, ${createdRecord.url})`);
                    });
                    return;
                }
                foundedRecord.update({ url: record.url }, { where: { name: record.name } }).then(updatedRecord => {
                    if (updatedRecord == null) {
                        throw Error("Playlist Updating Error");
                    }
                    console.log(`Update playlist: (${updatedRecord.name}, ${updatedRecord.url})`);
                });
            });
        }
    }
    findPlaylist(id) {
        return Playlist.findOne({ where: { name: id } });
    }
};
PlaylistRepository = __decorate([
    common_1.Component()
], PlaylistRepository);
exports.PlaylistRepository = PlaylistRepository;
//# sourceMappingURL=playlist.repository.js.map