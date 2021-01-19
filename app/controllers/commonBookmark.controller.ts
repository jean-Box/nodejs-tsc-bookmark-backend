import {NextFunction, Request, Response} from 'express';
import {Common, CommonInterface} from '../models/commonBookmark.model'
import {DestroyOptions, UpdateOptions} from 'sequelize'
import {OembedController} from './oembed.controller';
import {VimeoOembedDto} from '../dto/vimeoOembed.dto';
import {FlickrOembedDto} from "../dto/flickrOembed.dto";

export class CommonBookmarkController {

    public index(_req: Request, res: Response, next: NextFunction) {
        Common.findAll<Common>({})
            .then((datas: Common[]) => res.json(datas))
            .catch((err: Error) => res.status(500).json(err))
    }

    public create(req: Request, res: Response) {
        // const params: CommonInterface = req.body
        const oembedController: OembedController = new OembedController()

        oembedController.isVimeoLink(req.body.url) ?
            oembedController.getVimeoOembedFields(req.body)
                .then((bodyToRecord: VimeoOembedDto) =>
                    Common.create<Common>(bodyToRecord)
                ).then((common: Common) => res.status(201).json(common))
                .catch((err) => {
                    res.status(err.statusCode).json({
                        errors: err.message,
                        data: err.data
                    })
                }) :
            oembedController.getFlickrOembedFields(req.body)
                .then((bodyToRecord: FlickrOembedDto) =>
                    Common.create<Common>(bodyToRecord)
                ).then((common: Common) => res.status(201).json(common))
                .catch((err) => {
                    res.status(err.statusCode).json({
                        errors: err.message,
                        data: err.data
                    })
                })
    }

    public show(req: Request, res: Response) {
        // @ts-ignore
        const commonId: number = req.params.id

        Common.findByPk<Common>(commonId)
            .then((node: Common | null) => {
                if (node) {
                    res.json(node)
                } else {
                    res.status(404).json({errors: ['Common not found']})
                }
            })
            .catch((err: Error) => res.status(500).json(err))
    }
    private oembedController: OembedController = new OembedController()
    public update(req: Request, res: Response) {
        // @ts-ignore
        const commonId: number = req.params.id
        const params: CommonInterface = req.body
        const oembedController: OembedController = new OembedController()

        if (!oembedController.isVimeoLink(req.body.url) && !oembedController.isFlickrLink(req.body.url)) {
            res.status(400).json({
                errors: 'URL must be on Vimeo or Flickr domain',
                data: req.body.url
            })
        } else {
            const options: UpdateOptions = {
                where: {id: commonId},
                limit: 1
            }

            //TODO controler si il y a eu modification, si l'url existe

            Common.update(params, options)
                .then(() => res.status(202).json({data: "success"}))
                .catch((err: Error) => res.status(500).json(err))
        }
    }

    public delete(req: Request, res: Response) {
        // @ts-ignore
        const commonId: number = req.params.id
        const options: DestroyOptions = {
            where: {id: commonId},
            limit: 1
        }

        Common.destroy(options)
            .then(() => res.status(204).json({data: "success"}))
            .catch((err: Error) => res.status(500).json(err))
    }

    private dataValidations
}