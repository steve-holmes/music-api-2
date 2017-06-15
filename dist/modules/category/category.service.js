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
const category_repository_1 = require("./category.repository");
const suffix_1 = require("../suffix");
let CategoryService = class CategoryService {
    constructor(category) {
        this.category = category;
    }
    getPlaylist() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.category.getCategoryWithTransform('playlist', this.transform);
        });
    }
    getSong() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.category.getCategoryWithTransform('song', this.transform);
        });
    }
    getVideo() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.category.getCategoryWithTransform('video', this.parseVideoCategory);
        });
    }
    transform(list) {
        return list.map(({ name, categories }) => ({
            name,
            categories: categories.map(({ name, link }) => ({
                name,
                newlink: link + suffix_1.NEW_LINK_SUFFIX,
                hotlink: link + suffix_1.HOT_LINK_SUFFIX
            }))
        }));
    }
    parseVideoCategory(videos) {
        return videos.map(({ name, categories }) => ({
            name,
            categories: categories.map(({ name, link }) => ({
                name,
                newlink: link + suffix_1.NEW_VIDEO_LINK_SUFFIX,
                hotlink: link + suffix_1.HOT_VIDEO_LINK_SUFFIX
            }))
        }));
    }
};
CategoryService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map