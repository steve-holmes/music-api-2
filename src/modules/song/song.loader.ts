import * as request from 'request';
import * as $ from 'cheerio';
import { parseString } from 'xml2js';
import { Component } from '@nestjs/common';

@Component()
export class SongLoader {

    reponse(url) {
        return this.request(url).then(body => $(body))
            .then($body => {
                const $scripts = $body.find('div.playing_absolute script');
                const $script = $scripts.eq(1);
                return $script.html();
            })
            .then($scriptHtml => {
                const playerRegex = /^(\s*)player\.peConfig\.xmlURL = "(.*)";$/igm;
                const playerStatements = $scriptHtml.match(playerRegex);

                const requestRegex = /"(.*)"/i
                const requestURLs = playerStatements[0].match(requestRegex);
                const requestURL = requestURLs[1];

                return requestURL;
            })
            .then(requestURL => this.request(requestURL))
            .then(requestBody => this.parsingPromise(requestBody))
            .then(jsonTracks => jsonTracks.tracklist.track.map(this.getTrack))
            .then(tracks => tracks[0]);
    }

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