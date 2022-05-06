const router = require('express').Router();

const { Post } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (err) {
        console.error(err)
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create(
            {
                title: req.body.title,
                message: req.body.message,
                user_id: req.body.user_id //Change this!
            }
        );
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
})



module.exports = router;