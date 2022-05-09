const router = require('express').Router();
const { User, Post } = require('../../models');


// Create new user and log in.
router.post('/create', async (req, res) => {
    try {
        const userData = await User.create(
            {
                user_name: req.body.user_name,
                email: req.body.email,
                password: req.body.password
            }
        );
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

//Log in existing user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne( { where: { email: req.body.email } } );

        if (!userData) {
            res.status(400).json({message: "No account found matching these credentials."});
            return;
        }
        // built in password validation - returns true or false.
        const validPassword = await userData.checkPassword(req.body.password);

        //for wrong password:
        if(!validPassword) {
            res.status(400).json({ message: "Incorrect Password." });
            return;
        }

        //for correct password, create session:
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
        });
        // The miniproject had the res.status inside the req.session.save. Check this later.
        res.status(200).json({ user: userData, message: 'You are now logged in!' });
    } catch (err) {
        res.status(400).json(err);
        return;
    }
});

//Log out user:
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
