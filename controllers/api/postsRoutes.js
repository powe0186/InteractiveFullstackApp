const router = require('express').Router();

const { Post } = require('../../models');

router.get('/', async (req, res) => {
    try {
        console.log('ROUTE ENGAGED');
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (err) {
        console.error(err)
        res.status(400).json(err);
    }
})

module.exports = router;