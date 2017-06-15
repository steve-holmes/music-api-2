"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_helper_1 = require("../model.helper");
class TopicHelper extends model_helper_1.ModelHelper {
    static topics(topics) {
        return topics.map(topic => ({
            id: TopicHelper.getId(topic.url),
            name: topic.name,
            avatar: topic.avatar
        }));
    }
}
exports.TopicHelper = TopicHelper;
//# sourceMappingURL=topic.helper.js.map