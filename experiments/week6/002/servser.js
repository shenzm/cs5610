var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));

var courses = [
    { id: "cs5610", name: "Web Development" },
    { id: "cs6240", name: "Parallel Programming" },
    { id: "cs6740", name: "Network Security" }
];

app.get("/api/courses", function (req, res) {
    res.json(courses);
});

app.get("/api/courses/:id", function (req, res) {
    for (var i in courses) {
        if (req.params.id == courses[i].id) {
            res.json(courses[i]);
            return;
        }
    }
});

app.use('/app', express.static(__dirname + '/app'));

var businessList = [
    { id: '1', name: "Giacomo's Ristorante", category: 'Italian', price: '20', rating: '4.0' },
    { id: '2', name: 'The Salty Pig', category: 'Italian', price: '40', rating: '4.5' },
    { id: '3', name: 'Locale', category: 'Italian', price: '15', rating: '4.5' }
];

app.get("/api/businessList", function (req, res) {
    res.json(businessList);
});

app.use('/app2', express.static(__dirname + '/app2'));

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);