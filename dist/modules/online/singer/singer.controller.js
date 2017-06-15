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
const singer_service_1 = require("./singer.service");
let SingerController = class SingerController {
    constructor(singerService) {
        this.singerService = singerService;
    }
    getSingers(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const singers = yield this.singerService.getHotSingers();
            return response.status(common_1.HttpStatus.OK).json({ data: singers });
        });
    }
    getSingersFromAlpha(response, alpha) {
        return __awaiter(this, void 0, void 0, function* () {
            const singers = yield this.singerService.getSingers(alpha);
            return response.status(common_1.HttpStatus.OK).json({ data: singers });
        });
    }
    getSingersFromAlphaAtPage(response, alpha, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const singers = yield this.singerService.getSingers(alpha, +page);
            return response.status(common_1.HttpStatus.OK).json({ data: singers });
        });
    }
};
__decorate([
    common_1.Get('/'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SingerController.prototype, "getSingers", null);
__decorate([
    common_1.Get('/:alpha'),
    __param(0, common_1.Response()), __param(1, common_1.Param('alpha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SingerController.prototype, "getSingersFromAlpha", null);
__decorate([
    common_1.Get('/:alpha/:page'),
    __param(0, common_1.Response()), __param(1, common_1.Param('alpha')), __param(2, common_1.Param('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SingerController.prototype, "getSingersFromAlphaAtPage", null);
SingerController = __decorate([
    common_1.Controller('/online/singers'),
    __metadata("design:paramtypes", [singer_service_1.SingerService])
], SingerController);
exports.SingerController = SingerController;
//# sourceMappingURL=singer.controller.js.map