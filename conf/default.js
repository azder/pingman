/** Created by azder on 2017-10-07. */

const v4 = 'IPv4';
const v6 = 'IPv6';

const debug = false;
const dev = false;

module.exports = (

    {

        dev: dev,

        anchor:  '8.8.8.8',
        anchors: ['127.0.0.1', '8.8.8.8', '0.0.0.0'],

        ip: {
            v4,
            v6,
        },

        netping: {
            networkProtocol: v4,
            packetSize:      16,
            retries:         1, // net-ping default: 1
            sessionId:       (process.pid % 65535),
            timeout:         2000,
            ttl:             128,
            _debug:          dev && debug, // net-ping hidden option, default: false
        },

    }

);
