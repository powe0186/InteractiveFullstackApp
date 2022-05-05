const sequelize = require('../config/connection');

//import the tables. It automatically takes the index.js from /models.
const { User, Post } = require('../models');

const userData = require('./userData.json');
const posts = require('./posts.json');

const seedDatabase = async () => {
    //sync the databases and if it is already seeded, force will redo it.
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of posts) {
        await Post.create({
            ...post,
            // pick a random user for the post to be assigned to.
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0)
}

seedDatabase();