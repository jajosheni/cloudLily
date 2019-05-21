const User = require('../models/user');

module.exports = {
    displayAll : async function(req, res, next) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        let users = await User.find().sort({user:1}).skip(0, function(err, usr) {
            if (err) console.log(err);
            // object of all the users
            return usr;
        });
        res.send(users);
    },

    //check if user and password exist
    login_user: async function(req, res, next){
        let user = req.body.user;
        let password = req.body.password;

        User.find({user: user, password: password}, function (err, usr) {
            if (err) console.log(err);

            if(!usr.length){
                res.send('false');
            }else{
                res.send('true');
            }
        });
    },

    //create new user
    create_user : async function(req, res, next) {
        let user = req.body.user;
        let password = req.body.password;

        // user model
        const newUser = User({
            user: user,
            password: password,
        });

        User.find({user: user}, function (err, usr) {
            if (err) console.log(err);

            //check if user exists
            if(!usr.length){
                // save the user
                newUser.save(function(err) {
                    if (err) console.log(err);
                    res.json(usr);
                    console.log('User created!');
                });
            }else{
                res.send('Exists!');
            }
        });
    },

    //update password of a user
    update_password : async function(req, res, next){
        let user = req.body.user;
        let newPassword = req.body.newPassword;
        let oldPassword = req.body.oldPassword;

        User.findOneAndUpdate({user: user, password: oldPassword},
            {password: newPassword} , function(err, artc) {
                if (err) console.log(err);
                if(artc)
                    res.send(true);
                else
                    res.send(false);
            });
    },
};