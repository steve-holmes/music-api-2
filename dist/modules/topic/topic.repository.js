"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const topic_helper_1 = require("./topic.helper");
const db = require("../../models/models");
const Topic = db.Topic;
let TopicRepository = class TopicRepository {
    saveTopics(topics) {
        const records = topics.map(topic => ({
            name: topic_helper_1.TopicHelper.getId(topic.url),
            url: topic.url
        }));
        for (let record of records) {
            Topic.findOne({ where: { name: record.name } }).then(foundedRecord => {
                if (foundedRecord == null) {
                    Topic.create({ name: record.name, url: record.url }).then(createdRecord => {
                        if (createdRecord == null) {
                            throw Error("Topic Creation Error");
                        }
                        console.log(`Create topic: (${createdRecord.name}, ${createdRecord.url})`);
                    });
                    return;
                }
                foundedRecord.update({ url: record.url }, { where: { name: record.name } }).then(updatedRecord => {
                    if (updatedRecord == null) {
                        throw Error("Topic Updating Error");
                    }
                    console.log(`Update topic: (${updatedRecord.name}, ${updatedRecord.url})`);
                });
            });
        }
    }
    findTopic(id) {
        return Topic.findOne({ where: { name: id } });
    }
};
TopicRepository = __decorate([
    common_1.Component()
], TopicRepository);
exports.TopicRepository = TopicRepository;
//# sourceMappingURL=topic.repository.js.map