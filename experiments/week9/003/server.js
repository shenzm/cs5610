var express = require("express");
var mongoose = require("mongoose");
var app = express();

// week9 - app1 ++++++++++++++++++++

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bodyParser = require("body-parser");
var multer = require("multer");
var cookieParser = require("cookie-parser");
var session = require("express-session");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "this is the secret" }));
app.use(multer());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done){
        if(username == 'asd@asd.com' && password == 'asd')
        {
            var user = { firstName: 'Alice', lastName: 'Wonderland' };
            return done(null, user);
        }
        return done(null, false, {message: 'Unable to login'});
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// week9 - app2 ++++++++++++++++++++

var auth = function(req, res, next)
{
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

app.get('/api/test', auth, function(req, res) {
    res.json([{username: 123}, {username: 234}]);
});

app.use('/week9/app2', express.static(__dirname + '/week9/app2'));

// week9 - app2 ----------------------

app.post("/signin", passport.authenticate('local'), function (req, res){
    res.json(req.user);
});

app.use('/week9/app1', express.static(__dirname + '/week9/app1'));

// week9 - app1 ----------------------

// week9 - app3 ++++++++++++++++++++
app.get('/signedin', function(req, res){
   res.send(req.isAuthenticated()? req.user: '0');
});

app.use('/week9/app3', express.static(__dirname + '/week9/app3'));

// week9 - app3 ----------------------

var db_url = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/';
db_url += 'nodejsexp2';
mongoose.connect(db_url);

var RestaurantSchema = new mongoose.Schema({
    name: String, category: String,
    price: Number, rating: Number
}, { collection: 'Restaurants', versionKey: false });

var RestaurantModel = mongoose.model('Restaurants', RestaurantSchema);

app.use('/app1', express.static(__dirname + '/app1'));

app.get('/api/restaurants', function (req, res){
    RestaurantModel.find(function (err, data) {
        res.json(data);
    });
});

var FavoriteSchema = new mongoose.Schema({
    restaurantId: String, userId: String
}, { collection: 'Favorites', versionKey: false });

var FavoriteModel = mongoose.model('Favorites', FavoriteSchema);

app.use('/app2', express.static(__dirname + '/app2'));

app.get('/api/favorites', function (req, res){
    getFavoriteRestaurants(req, res);
});

app.use('/app3', express.static(__dirname + '/app3'));

app.get('/api/restaurants/:id', function (req, res){
    FavoriteModel
        .find({ restaurantId: req.param('id') })
        .exec(function(err, data){
            if(data.length > 0) {
                res.json({Status: "Exist"});
            }
            else {
                var newFavoriteDoc = {
                    restaurantId: req.param('id'),
                    userId: 'testUserId'
                };
                var newFavorite = new FavoriteModel(newFavoriteDoc);
                newFavorite.save(function (err) {
                    if (err)
                        res.json({Status: "Failed"});
                    else
                        res.json({Status: "Saved"});
                });
            }
        });
});

function getFavoriteRestaurants (req, res){
    FavoriteModel
        .find(function (err, data) {
            var favoriteRestaurantIDs = [];
            for(var i = 0; i < data.length; i++) {
                favoriteRestaurantIDs.push(data[i].restaurantId);
            }
            RestaurantModel
                .find()
                .where("_id").in(favoriteRestaurantIDs)
                .exec(function(err, result) {
                    res.json(result);
                });
        });
}

app.use('/app4', express.static(__dirname + '/app4'));

app.delete('/api/favorite/:id', function (req, res){
    FavoriteModel
        .remove({ restaurantId: req.param('id') }, function (err) {
            if(err)
                console.log(err);
            else
                getFavoriteRestaurants(req, res);
        })
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ip);

