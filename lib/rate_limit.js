import cfg from '../cfg/config.js';

const map = new Map();

/**
 * @param {*} key The api key making the request
 * @returns true if request allowed, false if denied
 */
export function checkRateLimit(key) {
    var bucket = map.get(key);

    //if key has not made requests yet create a new bucket for it
    if (bucket == undefined) {
        map.set(key, {
            timestamp: currentTime(),
            tokens: cfg.requestsPerWindow - 1
        });
        return true;
    }

    //check if bucket timestamp is in time window
    if (windowElapsed(bucket.timestamp, currentTime(), cfg.windowInSeconds)) {
        //window has elapsed, refresh timestamp and tokens
        bucket.timestamp = currentTime();
        bucket.tokens = cfg.requestsPerWindow - 1;
        return true;
    }
    else {
        //window has not elapsed
        //if no tokens available deny request
        //if tokens available allow request and subtract 1 from available tokens 
        if (bucket.tokens <= 0) {
            return false;
        }
        else {
            bucket.tokens -= 1;
            return true;
        }
    }
}

function currentTime() { return Date.now() / 1000; }

/**
 * @param {*} t1 the lower timestamp (seconds)
 * @param {*} t2 the higher timestamp (seconds)
 * @param {*} window the length of the window in seconds
 * @returns true if window expired, false if within window
 */
function windowElapsed(t1, t2, window) { return (t2 - t1 > window); }