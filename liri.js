require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require("axios");
const fs = require("fs");
var moment = require('moment');

const action = process.argv[2];
const nodeArgs = process.argv;
let value = "";

// loop through all the words in the node argument and add "+" in between arguments
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    value = value + "+" + nodeArgs[i];
  } else {
    value += nodeArgs[i];
  }
}
// console.log(value);

if (!action) {
  console.log(`\n>> Hi, this is LIRI. Nice to meet you :) Please enter your command to begin!
  \nSearch concerts  -->  node liri.js concert-this <enter artists> \nSearch songs  -->  node liri.js spotify-this-song <enter a song> \nSearch movies  -->  node liri.js movie-this <enter a movie> \nSurprise!  -->  node liri.js do-what-it-says \n`);
} else {

  switch (action) {
    case "concert-this":
      if (value) {
        showConcert();
      } else {
        console.log("\n>> Please enter a name of artists :) \n");
      }
      break;

    case "spotify-this-song":
      if (value) {
        showSpotify(value);
      } else {
        console.log("\n>> The Sign is the default setting. Please enter a song :)\n")
        showSpotify("The Sign ace of base");
      }
      break;

    case "movie-this":
      if (value) {
        showMovie(value);
      } else {
        console.log("\n>> \"Mr. Nobody\" is the default setting. Please enter a movie :)\n");
        showMovie("Mr. Nobody");
      }
      break;

    case "do-what-it-says":
      doWhatItSays();
      break;
  }
}

function showConcert() {
  let queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

  axios
    .get(queryUrl)
    .then(function (response) {
      // console.log(JSON.stringify(response, null, 2));  //returns error 
      // console.log(response);
      // console.log(response.data[0].venue);
      const responseObj = response.data[0];
      const name = responseObj.venue.name;
      const city = responseObj.venue.city;
      const country = responseObj.venue.country;
      const date = moment(responseObj.datetime).format("MM/DD/YYYY");

      console.log(`---------------------\nArtist: ${value} \nVenue: ${name} \nLocation: ${city}, ${country} \nDate: ${date} \n---------------------`);

    })
    .catch(function (err) {
      console.log(err);
    });
}

function showSpotify(value) {
  var spotify = new Spotify(keys.spotify);

  spotify
    .search({ type: "track", query: `"${value}"`, limit: "3" })
    .then(function (response) {

      console.log("\n>> Here are the top 3 results! \n\n---------------------");

      for (let i = 0; i < response.tracks.items.length; i++) {
        // console.log(response.tracks.items[i]);
        const responseObj = response.tracks.items[i];
        const name = responseObj.name;
        const artists = responseObj.artists[0].name;
        const link = responseObj.preview_url;
        const album = responseObj.album.name;

        console.log(`Artist: ${artists} \nName of the song: ${name} \nPreview link: ${link} \nAlbum: ${album} \n---------------------`);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};

function showMovie(value) {
  let queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
  axios
    .get(queryUrl)
    .then(function (response) {
      // console.log(response.data);
      const title = response.data.Title;
      const year = response.data.Year;
      const rating = response.data.Rated;
      const rottenTomatoes = response.data.Ratings[1].Value;
      const country = response.data.Country;
      const lang = response.data.Language;
      const plot = response.data.Plot;
      const actors = response.data.Actors;

      console.log(`---------------------\nTitle: ${title} \nYear: ${year} \nRating: ${rating} \nRotten Tomatoes rating: ${rottenTomatoes} \nCountry: ${country} \nLanguage: ${lang} \nPlot: ${plot} \nActors: ${actors} \n---------------------`)
    })
    .catch(function (err) {
      console.log(err);
    });
};

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    const dataArr = data.split(",");
    console.log(`\n>> Let's check out ${dataArr[1]}!`);
    // console.log(data);
    // console.log(dataArr[0]);

    switch (dataArr[0]) {
      case "concert-this":
        showConcert(dataArr[1]);
        break;

      case "spotify-this-song":
        showSpotify(dataArr[1]);
        break;

      case "movie-this":
        showMovie(dataArr[1]);
        break;
    }
  });
};
