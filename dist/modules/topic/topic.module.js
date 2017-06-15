"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const topic_controller_1 = require("./topic.controller");
const topic_service_1 = require("./topic.service");
const topics_loader_1 = require("./topics.loader");
const topic_loader_1 = require("./topic.loader");
const topic_repository_1 = require("./topic.repository");
const playlist_repository_1 = require("../playlist/playlist.repository");
let TopicModule = class TopicModule {
};
TopicModule = __decorate([
    common_1.Shared(),
    common_1.Module({
        controllers: [topic_controller_1.TopicController],
        components: [topic_service_1.TopicService, topics_loader_1.TopicsLoader, topic_loader_1.TopicLoader, topic_repository_1.TopicRepository, playlist_repository_1.PlaylistRepository]
    })
], TopicModule);
exports.TopicModule = TopicModule;
//# sourceMappingURL=topic.module.js.map