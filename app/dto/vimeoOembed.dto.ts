import {CommonOembedDto} from "./commonOembed.dto";

export class VimeoOembedDto extends CommonOembedDto{

    public width: number;
    public height: number;
    public duration: number;

    constructor(url: string, title: string, authorName: string, tags: any, width: number, height: number, duration: number) {
        super(url, title, authorName, tags);
        this.width = width;
        this.height = height;
        this.duration = duration;
    }
}

export interface VimeoOembedInterface {
    width: number;
    height: number;
    duration: number;
}