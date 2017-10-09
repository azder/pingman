/** Created by azder on 2017-10-08. */

const {ident, curry} = require('@azhder/nfun');
const {dev} = require('../conf/default');
const fname = require('./fname');

const log = curry(
    (severity, tag, message) => {
        // eslint-disable-next-line no-console
        console[severity](`[${tag}]`.toUpperCase(), message);
        return message;
    }
);


const dummy = () => ident;

module.exports = (
    {
        deblog: dev ? log('log') : dummy,
        inflog: dev ? log('info') : dummy,
        warlog: dev ? log('warn') : dummy,
        errlog: log('error'),
        tagof:
                (
                    (filename, ...args) =>
                        '' +
                        fname.js(filename) + (
                            args.length
                                ? ':' + args.join(':')
                                : ''
                        )
                ),
    }
);
