const router = require('express').Router();

const postsRoutes = require('./postsRoutes');

router.use('/posts', postsRoutes);


module.exports = router;