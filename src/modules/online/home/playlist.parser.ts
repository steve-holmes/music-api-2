import * as $ from 'cheerio';
import { Component } from '@nestjs/common';

@Component()
export class PlaylistParser {

    parse($body) {
        const $playlists = $body.find('div.list_album').eq(0).find('li');
        
        const self = this;
        const playlists = $playlists.map(function (i, elem) {
            return self.getPlaylist($(this));
        }).get();

        return playlists;
    }

    private getPlaylist($playlist) {
        const $name = $playlist.find('div.info_album a.name_song');
        const name = $name.text();

        const $singer = $playlist.find('div.info_album a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');

        const $url = $playlist.find('div.box-left-album a');
        const url = $url.attr('href');

        const $avatar = $playlist.find('div.box-left-album span.avatar img');
        const avatar = $avatar.attr('src');

        return { name, singer, avatar, url };
    }

}