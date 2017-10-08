/** Created by azder on 2017-10-08. */

// eslint-disable-next-line no-console
const c = console;

const def = (
    fn => (
        (...args) => {
            c[fn](...args);
            return args;
        }
    )
);

const echo = module.exports = def('log');

echo.w = def('warn');
echo.e = def('error');
echo.t = def('trace');
echo.i = def('info');



