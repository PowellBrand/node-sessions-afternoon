const users = require('../models/users');
var id = 1;

module.exports = {
    login: (req, res, next) => {
        const { session } = req;
        const { username, password } = req.body;

        //defines the user by checking in the users object. If the entered user name and password match something in the 
        //users array of objects, login will proceed. Otherwise you will get the 'Not a valid user' message.
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // This line is what determines what shows up when you login. In this case we only want the username to show up.
            // If the commented out line was active then the password would show up as well.
            session.user.username = user.username;
            // session.user.password = user.password;
            res.status(200).send(session.user);
        } else {
            res.status(500).send('Not a valid user');
        }
    },

    register: (req, res, next) => {
        const { session } = req;
        const { username, password } = req.body;
        users.push({ id, username, password });
        id++;

        session.user.username = username;
        res.status(200).send(session.user)

    },

    signout: (req, res, next) => {
        const { session } = req;
        req.session.destroy();
        res.status(200).send(req.session)
    },

    getUser: (req, res, next) => {
        const { session } = req;
        res.status(200).send(session.user)
    }
}
