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
const topics_loader_1 = require("./topics.loader");
const topic_loader_1 = require("./topic.loader");
const topic_repository_1 = require("./topic.repository");
const playlist_repository_1 = require("../playlist/playlist.repository");
const topic_helper_1 = require("./topic.helper");
const playlist_helper_1 = require("../playlist/playlist.helper");
let TopicService = class TopicService {
    constructor(topicsLoader, topicLoader, topicRepository, playlistRepository) {
        this.topicsLoader = topicsLoader;
        this.topicLoader = topicLoader;
        this.topicRepository = topicRepository;
        this.playlistRepository = playlistRepository;
    }
    getTopics() {
        return __awaiter(this, void 0, void 0, function* () {
            const topics = yield this.topicsLoader.response();
            this.topicRepository.saveTopics(topics);
            return topic_helper_1.TopicHelper.topics(topics);
        });
    }
    getTopic(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let topic = yield this.topicRepository.findTopic(id);
            topic = (yield this.topicLoader.response(topic.url));
            this.playlistRepository.savePlaylists(topic.playlists);
            return {
                name: topic.name,
                playlists: playlist_helper_1.PlaylistHelper.playlists(topic.playlists)
            };
        });
    }
};
TopicService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [topics_loader_1.TopicsLoader,
        topic_loader_1.TopicLoader,
        topic_repository_1.TopicRepository,
        playlist_repository_1.PlaylistRepository])
], TopicService);
exports.TopicService = TopicService;
//# sourceMappingURL=topic.service.js.map