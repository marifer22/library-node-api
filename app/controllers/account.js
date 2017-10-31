const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

router.post('/register', (req, res, next) => {
    Account.register(new Account({username: req.body.username}), req.body.password, (err,acount) => {
        if(err) {
            return res.json({error: err.message});
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if(err) {
                    return next(err);
                }
                res.json({success: true});
            });
        });
    });
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    req.session.save((err) => {
        if(err) {
            return next(err);
        }
        
        res.json({success:true});
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if(err) {
            return next(err);
        }

        res.json({success: true});
    });
});

module.exports = router;