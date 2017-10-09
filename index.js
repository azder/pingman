/** Created by azder on 2017-10-09. */

const {curry, tap, compose} = require('@azhder/nfun');

const single = require('./cmd/single');
const multi = require('./cmd/multi');

const {deblog, tagof} = require('./lib/taglog');

const pingman = curry(
    async (options, addr) => {

        const command = Array.isArray(addr) ? 'multi' : 'single';

        return tap(
            compose(
                deblog(tagof(__filename, command)),
                JSON.stringify
            ),
            await pingman[command](options, addr)
        );

    }
);

pingman.single = curry(single);
pingman.multi = curry(multi);

module.exports = pingman;



