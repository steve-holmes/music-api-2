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
const rank_service_1 = require("./rank.service");
let RankController = class RankController {
    constructor(rankService) {
        this.rankService = rankService;
    }
    getRanks(response, country) {
        return __awaiter(this, void 0, void 0, function* () {
            const countryName = this.rankService.getCountryName(country);
            const { songs, playlists, videos } = yield this.rankService.getRanks(country);
            return response.status(common_1.HttpStatus.OK).json({ data: {
                    country: countryName,
                    songs, playlists, videos
                } });
        });
    }
};
__decorate([
    common_1.Get('/:country'),
    __param(0, common_1.Response()), __param(1, common_1.Param('country')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RankController.prototype, "getRanks", null);
RankController = __decorate([
    common_1.Controller('ranks'),
    __metadata("design:paramtypes", [rank_service_1.RankService])
], RankController);
exports.RankController = RankController;
//# sourceMappingURL=rank.controller.js.map