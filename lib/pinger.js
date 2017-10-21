/** Created by azder on 2017-10-08. */

const {prom, curry} = require('@azhder/nfun');
const {deblog, warlog} = require('@azhder/taglog');
const {eclosed} = require('./SocketClosedError');
const tagof = require('./tagof');

module.exports = curry(
    (sm, address) => {

        const tag = tagof(__filename, ...sm.tags());
        const log = deblog(tag);
        const warn = warlog(tag);

        return prom((yay, nay) => {

            sm.on('error', error => nay(error));

            if (sm.closed()) {
                return nay([null, eclosed()]);
            }

            sm.ping(
                address,
                (error, target, sent, received) => {
                    const ms = received - sent;
                    if (error) {
                        warn(`${target}: ${error}`);
                        return nay([target, error]);
                    }
                    log(`${target}: alive (ms=${ms})`);
                    return yay([target, ms]);
                }
            );

            return void 0;

        });
    }
);
