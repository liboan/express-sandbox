var express = require('express');
var router = express.Router();
var fs = require("fs");
var mkdirp = require("mkdirp");

/* GET home page. */
router.get('/', function (req, res) { //read root directory
  	res.render('index', { title: "Andrew's sandbox"});
});

router.get("/edit/*", function (req, res) {
	console.log(req.param("path"));
	res.sendfile("public/input.html");
});

router.get("/home", function (req, res) {
	fs.readdir("public/home", function (err, data) {
		res.render("data", { title: "home", list: data});
	});
});


router.get('/home/*', function (req, res) {
	var path = "public/" + req.path.substring(1);
	console.log("Client requested " + path);
	fs.stat(path, function (err, stats) {
		if (err) {
			console.log("NOTFOUND HOME");
			res.render("notfound", {path: req.path});
		}
		else if (stats.isDirectory()) {
			var up = req.path.substring(0,req.path.lastIndexOf("/"));
			up = up.substring(0,up.lastIndexOf("/"));
			console.log("up: " + up);
			fs.readdir(path, function (err, data) {
				res.render("data", { title: req.path, goup: up, list: data});
			});
		}
		else if (stats.isFile()) {
			res.sendFile(path);	
		}
		else {
			res.render("notfound", {path: req.path});			
		}
	});
});


//POST requests
router.post("/newDir", function (req, res) {
	var newDir = "public" + req.body.path;
	console.log(newDir);
	console.log("PIE");
	mkdirp(newDir, function (err) {
		if (err) {
			res.send(500);
		}
		else {
			res.send(200);
		}
	});
});

router.post("/newFile", function (req, res) {
	var newFile = "public" + req.body.path;
	console.log(newFile);
	fs.writeFile(newFile, "", function (err) {
		if (err) {
			res.send(500);
		}
		else {
			res.send(200);
		}
	});
});

router.post("/readFile", function (req, res) {
	var path = "public/home/" + req.body.path;
	console.log(path);
	fs.readFile(path, function (err, data) {
		if (err) {
			res.send(500);
		}
		else {
			res.send(data);
		}
	});
});

module.exports = router;
