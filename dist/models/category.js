"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const CATEGORIES_FILE = 'config/categories.json';
class Category {
    getCategory(topic, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield this.getTopic(topic);
            const link = category;
            for (let song of songs) {
                const categories = song['categories'];
                for (let category of categories) {
                    if (category.link == link) {
                        return category;
                    }
                }
            }
            throw new Error("Category Not Found");
        });
    }
    getTopic(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.loadCategories();
            return data[type];
        });
    }
    loadCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.readFile(CATEGORIES_FILE, 'utf8', (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    return resolve(JSON.parse(data));
                });
            });
        });
    }
}
exports.Category = Category;
//# sourceMappingURL=category.js.map