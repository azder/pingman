/** Created by azder on 2017-10-09. */

const {first, second} = require('@azhder/nfun');
const echo = require('../lib/echo');


module.exports = (
    result => {

        const [epair, dpair] = result;

        const error = second(epair);

        error
            ? echo.w('NAY', error.message)
            : echo('YAY', first(dpair), 'in', second(dpair), 'ms');

        return result;
    }
);

