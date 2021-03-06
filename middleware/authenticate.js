var {User} = require('./../models/user');

function authenticate(req, res, next) {

    let token = req.header('x-auth');
    if (!token){
        res.send("Login First");
    }

    User.findByToken(token).then((user) => {

        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;

        next();
    }).catch((e) => {
        res.status(401).send("Authentication Error.");
    });

}

module.exports = {authenticate:authenticate};