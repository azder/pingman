/** Created by azder on 2017-10-09. */

class SocketClosedError extends Error {
    constructor(fn = SocketClosedError, ...args) {

        // Pass remaining arguments
        // (including vendor specific ones)
        // to parent constructor
        super(...args);

        this.name = 'SocketClosedError';
        this.message = 'Socket closed';

        // Maintains proper stack trace for where our error was thrown
        // noinspection JSUnresolvedFunction
        Error.captureStackTrace(this, fn);

    }

    static eclosed() {
        return new SocketClosedError(SocketClosedError.eclosed);
    }
}

module.exports = SocketClosedError;

