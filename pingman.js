/** Created by azder on 2017-10-07. */

const {nth, df} = require('@azhder/nfun');

const pingman = require('./index'); // the true pingman
const conf = require('./conf/default');

const {deblog, warlog, tagof} = require('./lib/taglog');

const third = nth(2, process.argv);
const cmd = df('single', third);

const tag = tagof(__filename, third, process.pid);
const warn = warlog(tag);
const log = deblog(tag);

process.on(
    'uncaughtException',
    err => warn(`uncaughtException: ${err.stack}`)
);

process.on(
    'unhandledRejection',
    (error, promise) => warn(`unhandledRejection: ${promise} because ${error.stack}`)
);

log('pinging...');
pingman(conf, cmd);
