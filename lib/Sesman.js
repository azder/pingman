/** Created by azder on 2017-10-09. */

const netping = require('net-ping');
const EventEmmiter = require('events');

const {deblog, warlog, tagof} = require('./taglog');

class Sesman extends EventEmmiter {

    constructor(options) {

        super();

        const s = netping.createSession(options);
        const ts = [s.sessionId].concat(options.tags);

        const tag = tagof(__filename, ...ts);
        const log = deblog(tag);
        const warn = warlog(tag);

        this.isclosed = false;

        s.on('close', () => {
            this.isclosed = true;
            log('socket closed');
            this.emit('close');
        });

        s.on('error', error => {
            warn(`${error}`);
            // session.close();
            this.emit('error');
        });

        this.s = s;
        this.ts = ts;
        log('constructed');

    }

    static sesman(options) {
        return new Sesman(options);
    }

    id() {
        return this.s.sessionId;
    }

    tags() {
        return this.ts;
    }

    closed() {
        return this.isclosed;
    }

    ping(target, callback) {
        this.s.pingHost(target, callback);
    }

}

module.exports = Sesman;
