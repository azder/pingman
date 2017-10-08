/** Created by azder on 2017-10-08. */

const ping = require('net-ping');
const {prom, curry} = require('@azhder/nfun');
const {deblog, warlog} = require('./taglog');

module.exports = curry(
    (options, address) => prom((resolve, reject) => {

        const session = ping.createSession(options);

        const tag = `ping:${session.sessionId}`;
        const log = deblog(tag);
        const warn = warlog(tag);

        session.on('close', () => log('socket closed'));

        session.on('error', (error) => {
            warn(`${error}`);
            session.close();
            return reject(error);
        });

        session.pingHost(address, (error, target, sent, rcvd) => {
            const ms = rcvd - sent;
            if (error) {
                warn(`${target}: ${error}`);
                return reject(error);
            }
            log(`${target}: alive (ms=${ms})`);
            return resolve({[address]: ms});
        });
    })
);
