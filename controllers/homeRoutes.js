const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');


//render login page.
router.get('/login', async (req, res) => {
    //If user is already logged in, just go to _____ page.
    if (req.session.logged_in) {
        //Figure out where to go if already loged in.
        //Direct to page showing all messages. (Maybe just first 10);
        res.redirect('/allMessages')
        return;
    }

    res.render('login');
})

modules.exports = router;