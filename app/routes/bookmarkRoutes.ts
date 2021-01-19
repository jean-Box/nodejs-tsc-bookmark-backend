import {CommonBookmarkController} from '../controllers/commonBookmark.controller';
import {urlValidationRules, validate} from '../validator/validatorBody';

const {check} = require('express-validator');

export class BookmarkRoutes {
    public bookmarkController: CommonBookmarkController = new CommonBookmarkController();

    public routes(app): void {

        app
            .get('/bookmark',
                this.bookmarkController.index)

        app
            .post('/bookmark',
                urlValidationRules(), validate,
                this.bookmarkController.create);

        app
            .route('/bookmark/:id')
            .get(this.bookmarkController.show)
            .delete(this.bookmarkController.delete);

        app.put('/bookmark/:id',
            urlValidationRules(), validate,
            this.bookmarkController.update);
    }

}