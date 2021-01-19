import supertest from 'supertest'

import nock from 'nock';
import fs from 'fs';
import {CommonInterface} from "../../../app/models/commonBookmark.model";

import {app} from '../../../app/server';

let serverApp, agent;

const vimeoBasePathUrl: string = 'https://vimeo.com/api';
const vimeoParam: string = '/oembed.json?url=https://vimeo.com/198392879';

const flickrBasePathUrl: string = 'https://www.flickr.com/services'
const flickrParam: string = 'npm';

const vimeoResponseFullOk =
    fs.readFileSync('__test__/resources/bodyResponse/vimeoRequest_full_OK.json', 'utf8');
const expectedPostBookmarkOk =
    fs.readFileSync('__test__/resources/expected/post_bookmark_ok.json', 'utf8');


beforeAll(async (done) => {
    serverApp = await app.listen(3000, () => {
        agent = supertest.agent(serverApp);
        done();
    });
})

afterAll(async (done) => {
    //await new Promise(resolve => setTimeout(resolve, 500));
    return serverApp && serverApp.close(done);
});

describe.only('GET /bookmark', () => {

    it('should return 404 & error response if BDD is empty', async done => {
        const res = await agent.get(`/bookmark`).send()
            .expect('Content-Type', "application/json; charset=utf-8")

        console.log(res)
        expect(res.body).toMatchObject({ status: 404 })
        expect(res.statusCode).toEqual(404)
        done()
    })


    it('should return 200 & valid response when BDD have data', async done => {

        // preparation
        const scope = nock(vimeoBasePathUrl)
            .get(vimeoParam)
            .reply(200, vimeoResponseFullOk)
        await agent.post(`/bookmark`)
            .send({
                "tags": "azerty yep autre",
                "url": "https://vimeo.com/198392879"
            })
        scope.done();
        // end of preparation

        const res = await agent.get(`/bookmark`).send()
            .expect('Content-Type', /json/)
            .expect(200)
        expect(res.statusCode).toEqual(200)

        const expectedBody: CommonInterface = JSON.parse(expectedPostBookmarkOk)
        const firstResult = res.body[0]

        expect(firstResult.url).toEqual(expectedBody.url)
        expect(firstResult.title).toEqual(expectedBody.title)
        expect(firstResult.authorName).toEqual(expectedBody.authorName)
        expect(firstResult.duration).toEqual(expectedBody.duration)
        expect(firstResult.height).toEqual(expectedBody.height)
        expect(firstResult.width).toEqual(expectedBody.width)
        expect(firstResult.tags).toEqual(expectedBody.tags)

        expect(firstResult.id).not.toBe(null)
        // auto générate
        expect(firstResult.createdAt).not.toBe(null)
        expect(firstResult.updatedAt).not.toBe(null)

        done()
    })


})

describe('POST /bookmark', () => {

    it('should return 200 & valid response ', async done => {
        const scope = nock(vimeoBasePathUrl)
            .get(vimeoParam)
            .reply(200, vimeoResponseFullOk)

        const res = await agent.post(`/bookmark`)
            .send({
                "tags": "azerty yep autre",
                "url": "https://vimeo.com/198392879"
            })
            .expect('Content-Type', /json/)

        scope.done();

        expect(res.statusCode).toEqual(201)

        const expectedBody: CommonInterface = JSON.parse(expectedPostBookmarkOk)

        expect(res.body.url).toEqual(expectedBody.url)
        expect(res.body.title).toEqual(expectedBody.title)
        expect(res.body.authorName).toEqual(expectedBody.authorName)
        expect(res.body.duration).toEqual(expectedBody.duration)
        expect(res.body.height).toEqual(expectedBody.height)
        expect(res.body.width).toEqual(expectedBody.width)
        expect(res.body.tags).toEqual(expectedBody.tags)


        expect(res.body.id).not.toBe(null)
        // auto générate
        expect(res.body.createdAt).not.toBe(null)
        expect(res.body.updatedAt).not.toBe(null)

        done()
    })

    it('should return 200 & valid response ', async done => {
        const scope = nock(vimeoBasePathUrl)
            .get(vimeoParam)
            .reply(200, vimeoResponseFullOk)

        const res = await agent.post(`/bookmark`)
            .send({
                "tags": "azerty yep autre",
                "url": "https://vimeo.com/198392879"
            })
            .expect('Content-Type', /json/)

        scope.done();
        console.log(res.body)
        console.log(res.statusCode)
        expect(res.statusCode).toEqual(201)

        const resultBody: CommonInterface = JSON.parse(expectedPostBookmarkOk)

        expect(res.body.url).toEqual(resultBody.url)
        expect(res.body.title).toEqual(resultBody.title)
        expect(res.body.authorName).toEqual(resultBody.authorName)
        expect(res.body.duration).toEqual(resultBody.duration)
        expect(res.body.height).toEqual(resultBody.height)
        expect(res.body.width).toEqual(resultBody.width)
        expect(res.body.tags).toEqual(resultBody.tags)


        expect(res.body.id).not.toBe(null)
        // auto générate
        expect(res.body.createdAt).not.toBe(null)
        expect(res.body.updatedAt).not.toBe(null)

        done()
    })
})