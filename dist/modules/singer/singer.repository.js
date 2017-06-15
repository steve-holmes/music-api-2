"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const singer_helper_1 = require("./singer.helper");
const db = require("../../models/models");
const Singer = db.Singer;
let SingerRepository = class SingerRepository {
    saveSingers(singers) {
        const records = singers.map(singer => ({
            name: singer_helper_1.SingerHelper.getId(singer.url),
            url: singer.url
        }));
        for (let record of records) {
            Singer.findOne({ where: { name: record.name } }).then(foundedRecord => {
                if (foundedRecord == null) {
                    Singer.create({ name: record.name, url: record.url }).then(createdRecord => {
                        if (createdRecord == null) {
                            throw Error('Singer Creation Error');
                        }
                        console.log(`Create singer: (${createdRecord.name}, ${createdRecord.url})`);
                    });
                    return;
                }
                foundedRecord.update({ url: record.url }, { where: { name: record.name } }).then(updatedRecord => {
                    if (updatedRecord == null) {
                        throw Error('Singer Updating Error');
                    }
                    console.log(`Update singer: (${updatedRecord.name}, ${updatedRecord.url})`);
                });
            });
        }
    }
    findSinger(id) {
        return Singer.findOne({ where: { name: id } });
    }
};
SingerRepository = __decorate([
    common_1.Component()
], SingerRepository);
exports.SingerRepository = SingerRepository;
//# sourceMappingURL=singer.repository.js.map