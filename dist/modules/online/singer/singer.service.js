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
const singer_loader_1 = require("./singer.loader");
const singer_api_1 = require("./singer.api");
const singer_repository_1 = require("../../singer/singer.repository");
const singer_helper_1 = require("../../singer/singer.helper");
let SingerService = class SingerService {
    constructor(singerLoader, singerAPI, singerRepository) {
        this.singerLoader = singerLoader;
        this.singerAPI = singerAPI;
        this.singerRepository = singerRepository;
    }
    getHotSingers() {
        return __awaiter(this, void 0, void 0, function* () {
            const singers = yield this.singerLoader.response(this.singerAPI.getHotSingerURL());
            this.singerRepository.saveSingers(singers);
            return singer_helper_1.SingerHelper.singers(singers);
        });
    }
    getSingers(alpha, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const singers = yield this.singerLoader.response(this.singerAPI.getURL(alpha, page));
            this.singerRepository.saveSingers(singers);
            return singer_helper_1.SingerHelper.singers(singers);
        });
    }
};
SingerService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [singer_loader_1.SingerLoader,
        singer_api_1.SingerAPI,
        singer_repository_1.SingerRepository])
], SingerService);
exports.SingerService = SingerService;
//# sourceMappingURL=singer.service.js.map