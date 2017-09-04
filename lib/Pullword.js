const request = require('request-promise-native').defaults({
    baseUrl: "http://api.pullword.com/",
    timeout: 15000
});

function createArr (data) {
    return data.trim().split('\r\n');
}

function createMap (data) {
    const map = new Map();
    createArr(data).map(elem => {
        const arr = elem.split(':');
        map.set(arr[0], arr[1]);
    });
    return map;
}

function onFulfilled (debug) {
    return data => debug ? createMap(data) : createArr(data);
}

function onRejected () {
    return err => Promise.reject(err);
}

class PullWord {
    constructor() {}

    checkParam(source, threshold, debug) {
        if (typeof source !== 'string') {
            return Promise.reject(new Error('source is invalid'));
        } else if (threshold < 0 || threshold > 1) {
            return Promise.reject(new Error('threshold is invalid'));
        } else if (typeof debug !== 'boolean') {
            return Promise.reject(new Error('debug is invalid'));
        } else {
            return Promise.resolve();
        }
    }

    get(source, threshold = 0, debug = true) {
        return this
                .checkParam(source, threshold, debug)
                .then(() => {
                    return request({
                        uri: '/get.php',
                        method: 'GET',
                        qs: {
                            source,
                            param1: threshold,
                            param2: debug ? 1 : 0
                        }
                    });
                })
                .then(onFulfilled(debug))
                .catch(onRejected());
    }

    post(source, threshold = 0, debug = true) {
        return this
                .checkParam(source, threshold, debug)
                .then(() => {
                    return request({
                        uri: '/post.php',
                        method: 'POST',
                        form: {
                            source,
                            param1: threshold,
                            param2: debug ? 1 : 0
                        }
                    });
                })
                .then(onFulfilled(debug))
                .catch(onRejected());
    }
}

module.exports = new PullWord();