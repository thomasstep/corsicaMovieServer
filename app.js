const express = require("express");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res, next) => res.send("Hello world"));
app.get("/movie/topRated", (req, res, next) => res.json(
  {
    page:	1,
    total_results:	1,
    total_pages:	1,
    results:	[
      {
        vote_count:	1741,
        id:	19404,
        video:	false,
        vote_average:	"9.2",
        title:	"Dilwale Dulhania Le Jayenge",
        popularity:	"18.482",
        poster_path:	"/testBird.jpg",
        original_language:	"hi",
        original_title:	"दिलवाले दुल्हनिया ले जायेंगे",
        genre_ids:	[
          35,
          18,
          10749
        ],
        backdrop_path:	"/testBird.jpg",
        adult:	"false",
        overview:	"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.",
        release_date:	"1995-10-20",
      },
      ]
  }
));
app.get("/image/:id", (req, res, next) => {
  var imageName = req.params.id;
  res.sendFile(__dirname + "/image/" + imageName);
});

app.listen(3001, () => console.log("Listening on 3001"));
