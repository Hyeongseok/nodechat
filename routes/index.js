var util   = require('../middleware/utilities')
,   user   = require('../passport/user')
,   config = require('../config')
;

module.exports = {
    index  : function(req, res) {
        res.render('index', {
            title: 'Index'
        });                
    },
    login  : function(req, res) {
        res.render('login', {
            title: 'Login',
            message: req.flash('error')
        });            
    },
    chat   : function(req, res) {
        res.render('chat', {title: 'Chat'});            
    },
    logout : function(req, res) {
        util.logout(req);
        res.redirect('/');            
    },
    register: function(req, res) {
        res.render('register', {
            title: 'Register'
        ,   message: req.flash('error')
        });
    },
    registerProcess: function(req, res) {
        if (req.body.username && req.body.password) {
            user.addUser(req.body.username, req.body.password, config.crypto.workFactor, function(err, profile) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect(config.routes.register);
                }
                
                return req.login(profile, function(err) {
                    res.redirect(config.routes.chat)
                });
            });
        }
        
        req.flash('error', 'Please fill out all the fields');
        res.redirect(config.routes.register);
    }
};


//module.exports.loginProcess = function(req, res) {
//    var isAuth = util.auth(req.body.username, req.body.password, req.session);
//    
//    if (isAuth)
//        res.redirect(config.routes.chat);
//    else {
//        req.flash('error', 'Wrong Username or Password');
//        res.redirect(config.routes.login);
//    }
//};