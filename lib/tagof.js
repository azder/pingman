/** Created by azder on 2017-10-21. */

const fname = require('./fname');

module.exports = (
    (filename, ...args) =>
        '' +
        fname.js(filename) + (
            args.length
                ? ':' + args.join(':')
                : ''
        )
);


