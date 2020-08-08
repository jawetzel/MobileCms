const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require("express-rate-limit");
const path = require('path');

const app = express();

app.set('trust proxy', true);

if(!process.env || !process.env.NODE_ENV || process.env.NODE_ENV !== 'production'){
    const ENV_FILE = path.join(__dirname, '.env');
    require('dotenv').config({ path: ENV_FILE });
}

app.use(compression());

var corsOptionsDelegate = function (req, callback) {
    callback(null, { origin: false });
};
app.use(cors(corsOptionsDelegate));

app.use(function (req, res, next) {
    res.removeHeader("X-Powered-By");
    next();
});

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 200
});
app.use('/api/', apiLimiter);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


//todo api endpoints here


const server = http.createServer(app);


const oneHour       = 3600;
const oneDay = oneHour * 24;


app.use(helmet.hsts({
    maxAge: 31536000
}));

app.use(helmet.hidePoweredBy());

//Content-Security-Policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        imgSrc: ["*", "data:", "blob:"],
        upgradeInsecureRequests: true,
        workerSrc: false  // This is not set.
    }
}));

app.use(helmet.frameguard({ action: 'deny' }));

app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

app.use(helmet.noSniff());

app.use(helmet.featurePolicy({
    features: {
        accelerometer: ["'none'"],
        ambientLightSensor: ["'none'"],
        camera: ["'none'"],
        autoplay: ["'none'"],
        geolocation: ["'none'"],
        gyroscope: ["'none'"],
        magnetometer: ["'none'"],
        microphone: ["'none'"],
        usb: ["'none'"],
        vr: ["'none'"],
    }
}));

app.use('/', express.static(('../front-end/buildServe/'), {
    setHeaders: function (res, path) {
        if (path.indexOf('index.html') > -1) {
            res.setHeader('Cache-Control', `public, max-age=${oneDay}`)
        }
    }}));

app.get(/^\/(?!api).*/, function(req, res, next) {
    res.setHeader('Cache-Control', `public, max-age=${oneDay}`);
    res.sendFile(('../front-end/buildServe/index.html'), {root: __dirname});
});

const port = process.env.PORT || 3001;
server.listen(port, function() {
    console.log('running on port: ' + port);
});