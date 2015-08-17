var express = require('express')
,   partials = require('express-partials')
,   cookieParser = require('cookie-parser')
,   session = require('express-session')
,   bodyParser = require('body-parser')
,   flash = require('connect-flash')
,   csrf = require('csurf')
,   redis = require('redis')
,   RedisStore = require('connect-redis')(session)
,   io = require('./socket.io')
,   passport = require('./passport')
;

var routes = require('./routes')
,   errorHandlers = require('./middleware/errorhandlers')
,   log = require('./middleware/log')
,   util = require('./middleware/utilities')
,   config = require('./config')
;

var client = redis.createClient()
,   app = express()
;

app.use(partials());
app.set('view options', {defaultLayout: 'layout'});
app.set('view engine', 'ejs');

app.use(log.logger);

// Static file served
app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/bower_components'));

// Use cookie
app.use(cookieParser(config.secret));

// Use session
app.use(session({
    secret: config.secret,
    // don't create session until something stored
    saveUninitialized: true, 
    // don't save session if unmodified
    resave: false,
    store: new RedisStore({
        host: config.redisHost,
        port: config.redisPort,
        client: client
    })
}));

app.use(flash());
app.use(util.templateRoutes);
app.use(passport.passport.initialize());
app.use(passport.passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);

// Routes
app.get('/', routes.index);
app.get(config.routes.login, routes.login);
app.get(config.routes.logout, routes.logout);
app.get(config.routes.register, routes.register);
app.post(config.routes.register, routes.registerProcess);
app.get(config.routes.chat, [util.requireAuthentication], routes.chat);
app.get('/error', function(req, res, next) {
   next(new Error('A contrived error')); 
});
passport.routes(app);
app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

var server = app.listen(config.port);
io.startIo(server);
console.log('App server running on port '+config.port);