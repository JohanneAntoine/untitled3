const express = require('express');
const router = express.Router();
const request = require('request');
const fetch = require("node-fetch");


/* GET home page. */
router.post('/', async function (req, res, next) {
    const options = {
        'method': 'POST',
        'url': 'http://postman-echo.com/post',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'sails.sid=s%3AjbON0Y6aqJ_ZHMfz3nqrzYcimohvlvRs.72Ahr%2BSxmVU9BE3e3k%2FDOMbWv0x8lQu%2BThHnctbpV7A'
        },
        form: {
            'city': req.body.city
        }
    };
    return new Promise((resolve, reject) => {
            request(options, function (error, response) {
                if (error) reject(new Error(error));
                else {
                    console.log(response.body);
                    resolve(response.body);
                }
            })
        }
    )

        .then(
            (responseFromBody) => {
                console.log(`Got a good response: ${responseFromBody}`)
                res.render('ps4', {response: responseFromBody})
            },
            (errorFromReject) => {
                res.render('ps4', {response: errorFromReject})
                console.log(`Error: ${errorFromReject}`)
            }
        )



});

async function ratesAsync() {
    const fx = await request('http://postman-echo.com/post');
    return fx;
}

ratesAsync()
    .then(function (fx) {
            console.log(`Rate is ${fx}`) //resolve
        },
        (err) => console.log(`${err}`) //reject
    )
    .then(() => console.log('All done.'))

const doReq = function (cb) {
    let options = {
        method: 'POST',
        url: 'https://postman-echo.com/post', //reflector
        qs: {test: '123'},
        headers: {
            'postman-token': '9bb9a22f-b509-6c7c-b716-cd4c3106ed0f',
            'cache-control': 'no-cache'
        }
    };
    console.log('received request');

    request(options, function (error, response, body) {
        console.log('completed request');
        const theBody = JSON.parse(body)
        const test = theBody.args.test;
        cb(test);
        if (error) {
            console.log('oops', error);
            throw new Error(error); }
        else {
            return body;
        }
    });
}
console.log('starting request')
let test = doReq((test) => console.log(`${test}`));
//console.log(test);
console.log('complete')


module.exports = router;