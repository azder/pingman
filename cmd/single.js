/** Created by azder on 2017-10-08. */

const {vow, obasgn, tap} = require('@azhder/nfun');

const {sesman} = require('../lib/Sesman');
const pinger = require('../lib/pinger');
const notify = require('../lib/notify');


module.exports = (
    async (options, address) => [ // single should return an array of 1 result, hence []
        tap(
            notify,
            await vow(
                pinger(sesman(obasgn(
                    'tags',
                    ['single'],
                    options
                )))(address)
            )
        ),
    ]
);


