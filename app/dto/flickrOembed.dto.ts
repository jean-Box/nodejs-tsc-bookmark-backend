import {CommonOembedDto} from "./commonOembed.dto";

export class FlickrOembedDto extends CommonOembedDto{

    public width: number;
    public height: number;

    constructor(url: string, title: string, authorName: string, tags: any, width: number, height: number) {
        super(url, title, authorName, tags);
        this.width = width;
        this.height = height;
    }
}

export interface FlickrOembedInterface {
    width: number;
    height: number;
}
