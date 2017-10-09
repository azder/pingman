/** Created by azder on 2017-10-07. */

'use strict'; // ALWAYS

const ping = require('net-ping');

// noinspection ES6ConvertVarToLetConst
var session = ping.createSession({
    networkProtocol: ping.NetworkProtocol.IPv4,
    packetSize:      16,
    retries:         1, // net-ping default: 1
    sessionId:       (process.pid % 65535),
    timeout:         2000,
    ttl:             128,
    _debug:          true // net-ping hidden option, default: false
});

session.on("close", () => console.log("socket closed"));

process.on('exit', (code) => {
    session.close(); // ERROR
    console.log(`About to exit with code: ${code}`);
});


// noinspection ES6ConvertVarToLetConst
var target = '8.8.8.0';

// noinspection ES6ConvertVarToLetConst
for (var i = 0; i < 4; i += 1) {
    setTimeout(() => {
            console.log('ping...');
            session.pingHost(target, (error, target) => {
                if (error) {
                    console.log('' + target + ': ' + error);
                } else {
                    console.log('' + target + ': Alive');
                }
            });
            console.log('pong!');
        },
        1000 * i
    );
}

// session.close();
setTimeout(() => process.exit(0), 2500);
