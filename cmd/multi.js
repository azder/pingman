/** Created by azder on 2017-10-08. */

const {curry, arrof, vow, obasgn, map, tap} = require('@azhder/nfun');

const {sesman} = require('../lib/Sesman');
const notify = require('../lib/notify');
const pinger = require('../lib/pinger');

// noinspection JSUnresolvedFunction
module.exports = curry(
    async (options, addresses) => (
        tap(
            map(notify),
            await Promise.all(
                // make sure addresses is an array
                arrof(addresses)
                // create the ping promises
                    .map(
                        pinger(sesman(obasgn(
                            'tags',
                            ['multi'],
                            options
                        )))
                    )
                    // turn the promises into vows
                    .map(vow)
            )
        )
    )
);


