import { Component } from '@nestjs/common';

import { SongLoader } from './song.loader';
import { SongRepository } from '../song/song.repository';
import { SongHelper } from '../song/song.helper';

@Component()
export class SongService {

    constructor(
        private songLoader: SongLoader,
        private songRepository: SongRepository
    ) {}

    async search(query: string) {
        const songs = await this.songLoader.reponse(query);

        this.songRepository.saveSongs(<any[]>songs);

        return { songs: SongHelper.songs(songs) };
    }

}