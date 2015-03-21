var mongoose = require("mongoose");
var express = require("express");
var app = express();

var db_url = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/';
db_url += 'nodejsexp';
mongoose.connect(db_url);

var RestaurantSchema = new mongoose.Schema({
    name: String, category: String,
    price: Number, rating: Number
}, { collection: 'Restaurants' });

var RestaurantModel = mongoose.model('Restaurants', RestaurantSchema);

app.use('/app1', express.static(__dirname + '/app1'));

app.get('/api/restaurants', function (req, res){
    RestaurantModel.find(function (err, data) {
        res.json(data);
    });
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ip);

