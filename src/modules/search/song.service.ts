import { Component } from '@nestjs/common';

import { SongLoader } from './song.loader';

@Component()
export class SongService {

    constructor(private songLoader: SongLoader) {}

    async search(query: string) {
        const songs = await this.songLoader.reponse(query);
        return songs;
    }

}