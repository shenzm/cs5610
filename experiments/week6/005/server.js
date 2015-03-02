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

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);