const router = require('express').Router();

const { Post } = require('../../models');

//Get ALL posts.
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (err) {
        console.error(err)
        res.status(400).json(err);
    }
});

//Get post based on its id
router.get('/:id', async (req, res) => {
    try {
        const posts = await Post.findByPk(req.params.id);
        res.status(200).json(posts);
    } catch (err) {
        console.error(err)
        res.status(400).json(err);
    }
});

//Update existing post by post id
router.put('/:id', async (req, res) => {
    try {
        const postToChange = await Post.findByPk(req.params.id);
        postToChange.update(
            {
                //Change the user_id once login function is working.
                title: req.body.title,
                message: req.body.message,
                user_id: req.body.user_id
            }
        )
        res.status(200).json(postToUpdate);
    } catch (err) {
        console.error(err)
        res.status(400).json(err);
    }
});

//Create a new post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create(
            {
                //Change the user_id once login function is working.
                title: req.body.title,
                message: req.body.message,
                user_id: req.body.user_id
            }
        );
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
})



module.exports = router;