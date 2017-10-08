/** Created by azder on 2017-10-07. */

const {vow} = require('@azhder/nfun');

const conf = require('./conf/default');
const ping = require('./lib/ping');
const echo = require('./lib/echo');
const {warlog} = require('./lib/taglog');

const warn = warlog('proc');

process.on(
    'uncaughtException',
    err => warn(`uncaughtException: ${err.stack}`)
);

process.on(
    'unhandledRejection',
    (error, promise) => warn(`unhandledRejection: ${promise} because ${error.stack}`)
);

(async address => {
    const [error, {[address]: ms} = {}] = (
        await vow(ping(conf.netping, address))
    );
    ms && echo('YAY', address, 'in', ms, 'ms');
    error && echo.w('NAY', error.message);
})(conf.anchor);

