"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const playlist_controller_1 = require("./playlist.controller");
const playlist_service_1 = require("./playlist.service");
const playlist_loader_1 = require("./playlist.loader");
const playlist_repository_1 = require("./playlist.repository");
let PlaylistModule = class PlaylistModule {
};
PlaylistModule = __decorate([
    common_1.Shared(),
    common_1.Module({
        controllers: [playlist_controller_1.PlaylistController],
        components: [playlist_service_1.PlaylistService, playlist_loader_1.PlaylistLoader, playlist_repository_1.PlaylistRepository]
    })
], PlaylistModule);
exports.PlaylistModule = PlaylistModule;
//# sourceMappingURL=playlist.module.js.map