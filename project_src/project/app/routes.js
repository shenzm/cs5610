var UserModel = require('./models/user');
var ReviewModel = require('./models/review');
var async = require("async");
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: 'AKIAJFSDTVW2VI7QL4LA',
    secretAccessKey: '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'
});
var fs = require('fs');

module.exports = function(app, passport) {

    var auth = function(req, res, next)
    {
        if (!req.isAuthenticated())
            res.send(401);
        else
            next();
    };

    // server routes ===========================================================

    // Authentication related

    app.post("/register", function(req, res) {
        var email = req.body.newUser.email;
        UserModel.findOne({ 'email' :  email }, function(err, user) {
            if (err)
                res.send(err);
            if (user)
                res.json({ status: "Warning", message: 'Email already registered' });
            else {
                var newUser = new UserModel({
                    email: req.body.newUser.email,
                    password: req.body.newUser.password,
                    firstname: req.body.newUser.firstname,
                    lastname: req.body.newUser.lastname,
                    username: req.body.newUser.username
                });
                newUser.password = newUser.generateHash(newUser.password);
                newUser.save(function(err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        req.logIn(newUser, function () {
                            if (err) {
                                res.send(err);
                            }
                            else {
                                res.send(200);
                            }
                        });
                    }
                });
            }
        });
    });

    app.post("/login", function(req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return res.json({"status": "Error"});
            }
            if (user) {
                req.logIn(user, function () {
                    if (err) {
                        return res.json({"status": "Error"});
                    }
                    else {
                        user.password = null;
                        return res.json({"status": "Success", "user": user});
                    }
                });
                return res.json({"status": "Success", "user": user});
            }
            if (info) {
                return res.json({"status": "Warning", "message": info.message});
            }
        })(req, res, next);
    });

    app.get('/loginCheck', function(req, res){
        res.json(req.isAuthenticated()? req.user: null);
    });

    app.post('/signout', function(req, res){
        req.logOut();
        res.send(200);
    });

    app.post('/forget', function(req, res, next) {
        async.waterfall([
            function(done) {
                crypto.randomBytes(8, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                UserModel.findOne({ email: req.body.email }, function(err, user) {
                    if (!user) {
                        return res.json({ status: "Warning", message: 'No account with that email address exists.' });
                    }

                    user.password = user.generateHash(token);
                    user.save(function(err) {
                        done(err, token, user);
                    });
                });
            },
            function(token, user, done) {
                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'zhenmins.dev@gmail.com',
                        pass: 'ToBeNo.1'
                    }
                });

                var email_content = 'You are receiving this because you (or someone else) have requested the ' +
                    'reset of the password for your account.\n\n' +
                    'Here is your temporary new password:\n\n' +
                    token + '\n\n';
                // setup e-mail data with unicode symbols
                var mailOptions = {
                    from: 'zhenmins.dev@gmail.com',        // sender address
                    to: user.email,                        // list of receivers
                    subject: 'Reset Password - ReadiBook',     // Subject line
                    text: email_content
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(err, info){
                    if(err){
                        res.send(err);
                        done();
                    } else{
                        res.json({
                            status: "Success",
                            message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'
                        });
                        done();
                    }
                });
            }
        ], function(err) {
            if (err)
                res.send(err);
        });
    });

    // Model related

    app.get('/api/favorites/:id', function(req, res) {
        // get all user who favorite this book
        UserModel.find({ "favoriteBooks" : { $elemMatch: { id: req.param('id') } } },
            function (err, users) {
                if(err){
                    res.send(err);
                }
                res.json(users);
            });
    });

    app.put('/api/favorites', auth, function(req, res) {
        // favorite this book for the logged in user
        UserModel.findOne({ _id : req.user._id},
            function (err, user) {
                if(err)
                    res.send(err);
                var i;
                var alreadyIn = false;
                for(i = 0; i < user.favoriteBooks.length; i++) {
                    if(user.favoriteBooks[i].id == req.body.volume_sketch.id)
                        alreadyIn = true;
                }
                if(!alreadyIn) {
                    user.favoriteBooks.push(req.body.volume_sketch);
                    user.save(function (err) {
                        if (err)
                            res.send(err);
                        res.send(200);
                    });
                }
                else {
                    res.send(200);
                }
            });
    });

    app.delete('/api/favorites/:id', auth, function(req, res) {
        // delete this book
        UserModel.findOne({ _id : req.user._id},
            function (err, user) {
                if(err){
                    res.send(err);
                }
                var i;
                var indexToDelete;
                for (i = 0; i < user.favoriteBooks.length; i++) {
                    if (user.favoriteBooks[i].id == req.param('id'))
                        indexToDelete = i;
                }
                user.favoriteBooks.splice(indexToDelete, 1);
                user.save(function (err, user) {
                    if(err)
                        res.send(err);
                    res.json(user);
                });
            });
    });

    // Find a user, and return its public info
    app.get('/api/user/public/:id', function(req, res) {
        UserModel.findOne({ "_id" : req.param('id') },
            function (err, user) {
                if(err){
                    res.send(err);
                }
                else {
                    res.json(user);
                }
            });
    });

    // Add a user as friend by id
    app.put('/api/friends', auth, function(req, res) {
        UserModel.findOne({ _id : req.user._id},
            // get the user who sends the request
            function (err, user) {
                if(err)
                    res.send(err);
                var i;
                var alreadyIn = false;
                for(i = 0; i < user.friends.length; i++) {
                    if(user.friends[i].id == req.body.user_sketch.id)
                        alreadyIn = true;
                }
                if(!alreadyIn) {
                    user.friends.push(req.body.user_sketch);
                    user.save(function (err) {
                        if (err)
                            res.send(err);
                        res.send(200);
                    });
                }
                else {
                    res.send(200);
                }
            });
    });

    // remove a friend
    app.delete('/api/friends/:id', auth, function(req, res) {
        // delete a friend of current request user
        UserModel.findOne({ _id : req.user._id},
            function (err, user) {
                if(err){
                    res.send(err);
                }
                var i;
                var indexToDelete;
                for (i = 0; i < user.friends.length; i++) {
                    if (user.friends[i].id == req.param('id'))
                        indexToDelete = i;
                }
                user.friends.splice(indexToDelete, 1);
                user.save(function (err, user) {
                    if(err)
                        res.send(err);
                    res.json(user);
                });
            });
    });

    //update user profile
    app.post('/api/user/update', auth, function(req, res) {
        UserModel.update({ _id : req.user._id },
            {
                username: req.body.user_info.username,
                firstname: req.body.user_info.firstname,
                lastname: req.body.user_info.lastname,
                email: req.body.user_info.email
            },
            function (err, user) {
                if(err){
                    res.send(err);
                }
                res.json(user);
            }
        );
    });

    //update user password
    app.post('/api/user/update/password', auth, function(req, res) {
        UserModel.findOne({ _id : req.user._id },
            function (err, user) {
                if(err){
                    res.send(err);
                }
                var hash = user.generateHash(req.body.newpwd);
                user.update({password: hash}, function (err, user) {
                    if(err){
                        res.send(err);
                    }
                    res.json(user);
                });
            }
        );
    });

    // upload user photo
    app.post('/api/photo', auth, function(req,res){
        if (req.files.file == null) {
            res.send (200);
            fs.unlinkSync(req.files.file.path);
        }
        else if (req.files.file.mimetype != "image/jpeg")
            res.json({status: "warning", message: "Only allow jpeg file"});
        else {
            var img_path = req.files.file.path;
            var user_id = req.user._id;
            var body = fs.createReadStream(img_path);
            var s3bucket = new AWS.S3({params: {Bucket: 'zhenmins-public-img/users'}});
            var upload_params = {
                Key: user_id + Date.now() + '.jpg',
                Body: body,
                ACL: "public-read"
            };
            s3bucket.upload(upload_params, function(err, data) {
                var img_url = data.Location;
                if(data.Location == null) { res.json(data) }
                else {
                    UserModel.findOne({ _id : req.user._id},
                        function (err, user) {
                            if(err){
                                res.send(err);
                            }
                            user.img_url = img_url;
                            user.save(function (err, user) {
                                if(err)
                                    res.send(err);
                                res.json({status: "success", url: img_url});
                            });
                            fs.unlinkSync(img_path);
                        });
                }
            });
        }
    });

    // get all users, with in the list
    app.post('/api/users', function(req, res) {
        var user_id_list = req.body.user_id_list;
        UserModel.find({ _id : { $in: user_id_list } }, function (err, users) {
            if(err){
                res.send(err);
            }
            res.json(users);
        });
    });

    // get all reviews of a certain book id
    app.get('/api/review/:id', function(req, res) {
        ReviewModel.find({ book_id: req.param('id') }, function (err, reviews) {
            if(err)
                res.send(err);
            res.json(reviews);
        });
    });

    // add a review for the book
    app.post('/api/review', auth, function(req, res) {
        var auth_user_id = req.user._id;
        var review_obj = req.body.review;
        if(review_obj.user_id != auth_user_id) {}
        else {
            var newReview = ReviewModel({
                user_id: review_obj.user_id,
                book_id: review_obj.book_id,
                review_time: review_obj.review_time,
                content: review_obj.content,
                user_name: review_obj.user_name
            });
            newReview.save(function (err, review) {
                if(err)
                    res.send(err);
                res.json({status: "success", review: review});
            });
        }
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests

    app.get('/', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};