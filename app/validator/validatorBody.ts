import {body, validationResult} from 'express-validator';

/**
 * valide if url param is ok
 */
const urlValidationRules = () => {
    console.log('urlValidationRules')
    return [
        body('url').custom(value => {
            if (!validateUrl(value)) {
                return Promise.reject('URL must be a Flickr or Vimeo domain');
            }
            return true;
        })
    ]
}
/**
 * go next if no error in express-validator
 * @param req
 * @param res
 * @param next
 */
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))

    return res.status(400).json({
        errors: extractedErrors,
    })
}
/**
 * true if URL is vimeo or flickr domain
 * @param url url to test
 */
const validateUrl = (url: string): boolean => {
    return isVimeoLink(url) || isFlickrLink(url)
}

const isVimeoLink = (url: string): boolean => {
    console.log(url.indexOf('vimeo.com') !== -1)
    return url.indexOf('vimeo.com') !== -1;
}

const isFlickrLink = (url: string): boolean => {
    console.log(url.indexOf('flickr.com') !== -1)
    return url.indexOf('flickr.com') !== -1;
}

export {
    urlValidationRules,
    validate
}