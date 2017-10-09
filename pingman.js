/** Created by azder on 2017-10-07. */

const {nth, df, objof} = require('@azhder/nfun');

const pingman = require('./index'); // the true pingman
const {deblog, warlog, tagof} = require('./lib/taglog');


// TODO: make better conf system
const conf = objof(require('./conf/default'));

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


const options = conf.netping;

log(`pinging w/ ${JSON.stringify(options)}...`);

pingman(
    options,
    // single is default if cmd is unknown
    ('multi' === cmd) ? conf.anchors : conf.anchor
);
