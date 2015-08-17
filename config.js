var config = {
    port: process.env.PORT
,   secret: process.env.SECRET
,   redisHost: process.env.REDIS_HOST
,   redisPort: process.env.REDIS_PORT
,   routes: {
        login: '/account/login'
    ,   logout: '/accout/logout'
    ,   register: '/account/register'
    ,   chat: '/chat'
    ,   facebookAuth: '/auth/facebook'
    ,   facebookAuthCallback: '/auth/facebook/callback'
    ,   googleAuth: '/auth/google'
    ,   googleAuthCallback: '/auth/google/callback'
    },
    host: process.env.HOST
,   facebook: {
        appID: process.env.FACEBOOK_APPID          // '988313094562883'
    ,   appSecret: process.env.FACEBOOK_APPSECRET  // '925c4aac06f15ccdb309f8bf70e7e691'
    }
,   google: {
        clientID: process.env.GOOGLE_APPID         // '253702206131-4dinss35bbn1hfg016jf4nqueu85r127.apps.googleusercontent.com'
    ,   clientSecret: process.env.GOOGLE_APPSECRET // '21CsL1jYb6eU1Mg1u2IkUzEa'
    }
,   crypto: {
        workFactor: 5000
    ,   keylen: 32
    ,   randomSize: 256
    }
,   rabbitMQ: {
        URL: process.env.RABBITMQ_URL              // 'amqp://guest:guest@localhost:5672'
    ,   exchange: process.env.RABBITMQ_EXCHANGE    // 'packtchat.log'
    }    
};

module.exports = config;