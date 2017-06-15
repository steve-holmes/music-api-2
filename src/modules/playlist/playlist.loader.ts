import * as request from 'request';
import * as $ from 'cheerio';
import { parseString } from 'xml2js';
import { Component } from '@nestjs/common';

@Component()
export class PlaylistLoader {

    response(url) {
        return this.request(url)
            .then(body => {
                const $body = $(body);

                const $scripts = $body.find('div.playing_absolute script');
                const $script = $scripts.eq(1);
                const tracksPromise = this.tracksPromiseFromScript($script.html());
                
                const $relativePlaylists = $body.find('div.box_playlist_recommended div.list_item_music li');
                const relativePlaylistPromise = this.relativePlaylistFromDOM($relativePlaylists);

                return Promise.all([tracksPromise, relativePlaylistPromise]);
            })
            .then(([tracks, others]) => ({ tracks, others }));
    }

    private tracksPromiseFromScript($scriptHtml) {
        const scriptPromise = ($scriptHtml) => {
            const playerRegex = /^(\s*)player\.peConfig\.xmlURL = "(.*)";$/igm;
            const playerStatements = $scriptHtml.match(playerRegex);

            const requestRegex = /"(.*)"/i
            const requestURLs = playerStatements[0].match(requestRegex);
            const requestURL = requestURLs[1];
            return Promise.resolve(requestURL);
        };

        return scriptPromise($scriptHtml)
            .then(requestURL => this.request(requestURL))
            .then(requestBody => this.parsingPromise(requestBody))
            .then(jsonTracks => jsonTracks.tracklist.track.map(this.getTrack));
    };

    private getTrack(track) {
        return {
            title: track.title[0],
            time: track.time[0],
            singer: track.creator[0],
            location: track.location[0],
            info: track.info[0],
            lyric: track.lyric[0],
            avatar: track.avatar[0],
            newtab: track.newtab[0],
            kbit: track.kbit[0]
        };
    }

    private relativePlaylistFromDOM($playlists) {
        const self = this;
        const relativePlaylists = $playlists.map(function (i, elem) {
            return self.getRelativePlaylist($(this));
        }).get();
        return Promise.resolve(relativePlaylists);
    }

    private getRelativePlaylist($playlist) {
        const $name = $playlist.find('div.info_data a.name_song');
        const name = $name.text();
        const url = $name.attr('href');

        const $singer = $playlist.find('div.info_data a.name_singer');
        const singer = $singer.map(function (i, elem) {
            return $(this).text();
        }).get().join(', ');

        const $avatar = $playlist.find('a.name_song span.thum-playlist img');
        const avatar = $avatar.attr('src');

        return { name, singer, avatar, url }
    }

    private request(url): Promise<any> {
        return new Promise((resolve, reject) => {
            request.get(url, (error, response, body) => {
                if (error) { return reject(error); }
                resolve(body);
            });
        });
    }

    private parsingPromise(xml): Promise<any> {
        return new Promise((resolve, reject) => {
            parseString(xml, { trim: true, normalize: true }, (error, result) => {
                if (error) { reject(error); }
                resolve(result); 
            });
        });
    }

}