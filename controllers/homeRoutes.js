const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');


//render home page.
router.get('/', async (req, res) => {
    try {
        const messageData = await Post.findAll({
            include: [
                {
                    model: User,
                }
            ]
        });
        
        const posts = messageData.map((message) => message.get({ plain: true }));
        console.log(posts);
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    };
    res.render('login');
})

module.exports = router;