import { Controller, HttpStatus, Get, Response, Param } from '@nestjs/common';

import { TopicService } from './topic.service';

@Controller('topics')
export class TopicController {

    constructor(private topicService: TopicService) {}

    @Get('/')
    async getTopics(@Response() response) {
        const topics = await this.topicService.getTopics();
        return response.status(HttpStatus.OK).json({ data: topics });
    }

    @Get('/:id')
    async getTopic(@Response() response, @Param('id') id) {
        const topic = await this.topicService.getTopic(id);
        return response.status(HttpStatus.OK).json({ data: topic });
    }

}