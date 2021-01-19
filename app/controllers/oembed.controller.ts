import got from 'got';
import {VimeoOembedDto} from '../dto/vimeoOembed.dto';
import {FlickrOembedDto} from '../dto/flickrOembed.dto';
import {BadRequestError} from "../exception/badRequestError";

export class OembedController {

    private vimeoUrl: string = 'https://vimeo.com/api/oembed.json?url=';
    private flickr: string = 'https://www.flickr.com/services/oembed/?format=json&url='

    private options = {
        method: 'GET',
        responseType: 'json',
        resolveWithFullResponse: true
    } as const;

    /**
     * call Vimeo oembed API to retrieve fields
     * @param body body with url to search
     */
    public async getVimeoOembedFields(body): Promise<VimeoOembedDto> {
        return await got(this.generateOembedUrlfrom(body.url), this.options)
            .then(response => {
                // @ts-ignore
                const {title, author_name, width, height, duration} = response.body;
                return new VimeoOembedDto(body.url, title, author_name, body.tags, width, height, duration);
            })
            .catch(err => {
                console.log(err.response);
                if (err.response.statusCode === 404) {
                    return Promise.reject(new BadRequestError({message :'Couldn\'t find the specified resource', data: err.response.url }))
                }else {
                    return Promise.reject(new Error('Unknown error '+ JSON.stringify(err)))
                }
            });
    }

    /**
     * call Flickr oembed API to retrieve fields
     * @param body body with url to search
     */
    public async getFlickrOembedFields(body): Promise<FlickrOembedDto> {

        return await got(this.generateOembedUrlfrom(body.url), this.options)
            .then(response => {
                // @ts-ignore
                const {title, author_name, width, height} = response.body;
                return new FlickrOembedDto(body.url, title, author_name, body.tags, width, height);
            })
            .catch(err => {
                console.log(err.response);
                if (err.response.statusCode === 404) {
                    return Promise.reject(new BadRequestError({message :'Couldn\'t find the specified resource', data: err.response.url }))
                }else {
                    return Promise.reject(new Error('Unknown error '+ JSON.stringify(err)))
                }
            });
    }

    /**
     * return oembed URL for Vimeo or Flickr API
     * @param url
     * @private
     */
    private generateOembedUrlfrom(url): string {
        let oembedUrl: string;
        if (this.isVimeoLink(url)) {
            oembedUrl = this.vimeoUrl + url
        } else if (this.isFlickrLink(url)) {
            oembedUrl = this.flickr + url
        }
        console.log(oembedUrl)
        return oembedUrl
    }

    /**
     * true if is Vimeo URL
     * @param url
     */
    public isVimeoLink(url): boolean {
        console.log(url)
        console.log(url.indexOf('vimeo.com') !== -1)
        return url.indexOf('vimeo.com') !== -1;
    }

    /**
     * true if is Flickr URL
     * @param url
     */
    public isFlickrLink(url): boolean {
        console.log(url)
        console.log(url.indexOf('flickr.com') !== -1)
        return url.indexOf('flickr.com') !== -1;
    }
}
