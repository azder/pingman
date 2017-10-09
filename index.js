/** Created by azder on 2017-10-09. */

const {curry} = require('@azhder/nfun');

const single = require('./cmd/single');
const multi = require('./cmd/multi');

const {deblog, tagof} = require('./lib/taglog');

module.exports = curry(
    async (conf, cmd) => {

        const options = conf.netping;

        deblog(tagof(__filename, cmd))(`pinging w/ ${JSON.stringify(options)}...`);

        if ('multi' === cmd) {
            return await multi(options, conf.anchors);
        }

        // if 'single' === cmd || isUnknown(cmd)
        return await single(options, conf.anchor);

    }
);



