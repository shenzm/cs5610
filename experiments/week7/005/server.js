var mongoose = require("mongoose");
var express = require("express");
var app = express();

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

// app2

app.use('/app2', express.static(__dirname + '/app2'));

app.get('/api/favorites', function (req, res){
    getFavoriteRestaurants(req, res);
});

// app3

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

// app4

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

