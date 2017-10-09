/** Created by azder on 2017-10-08. */

const {basename} = require('path');


const def = (
    ext => (
        filename => basename(filename, ext)
    )
);

const fname = module.exports = def();

['js', 'mjs'].map(
    ext => (
        fname[ext] = def('.' + ext)
    )
);


