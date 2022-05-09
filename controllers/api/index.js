const router = require('express').Router();

const postsRoutes = require('./postsRoutes');
const userRoutes = require('./userRoutes');

router.use('/posts', postsRoutes);
router.use('/user', userRoutes);


module.exports = router;