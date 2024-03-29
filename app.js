const express = require("express");
const app = express();
var fs = require("fs");
var contents = fs.readFileSync("movie/movies.json");
var allMovies = JSON.parse(contents);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res, next) => res.send("Hello world"));

app.get("/movie/topRated", (req, res, next) => res.json(allMovies));

app.get("/image/:id", (req, res, next) => {
  var imageName = req.params.id;
  res.sendFile(__dirname + "/image/" + imageName);
});

app.get("/movie/:id", (req, res, next) => {
  var movieId = parseInt(req.params.id);
  var movies = allMovies.results;
  for(var i = 0; i < movies.length; i++) {
    var obj = movies[i];
    console.log(obj);
    if(obj.id === movieId) {
      res.send(obj);
    }
  }
  res.status(404).send("Movie not found.");
});

app.get("/download/:path", (req, res, next) => {
  var movieDownloadPath = req.params.path;
  // Need to figure out how to copy to USB from here

  console.log("Copying: " + __dirname + "/movie/" + movieDownloadPath);
  console.log("To: " + "/Volumes/THEFOOTBALL/Movies" + movieDownloadPath);
  fs.createReadStream(__dirname + "/movie/" + movieDownloadPath).pipe(fs.createWriteStream("/Volumes/THEFOOTBALL/Movies/" + movieDownloadPath));
  res.status(200).send("It worked");
});

app.listen(3001, () => console.log("Listening on 3001"));
