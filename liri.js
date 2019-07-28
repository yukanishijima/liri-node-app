// Read and set environment variables
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require("axios");

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
console.log(value);

switch (action) {
  case "concert-this":
    showConcert();
    break;
  case "spotify-this-song":
    showSpotify();
    break;
  case "movie-this":
    showMovie();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
}

function showConcert() {
  let queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

  axios
    .get(queryUrl)
    .then(function (response) {
      // console.log(JSON.stringify(response, null, 2));  //returns error 
      console.log(response);
      console.log(response.data[0].venue);
      const responseObj = response.data[0];
      const name = responseObj.venue.name;
      const city = responseObj.venue.city;
      const country = responseObj.venue.country;
      const date = responseObj.datetime;

      console.log(`------------------ \nArtist: ${value} \nVenue: ${name} \nLocation: ${city}, ${country} \nDate: ${date}`);

    })
    .catch(function (err) {
      console.log(err);
    });
}

function showSpotify() {
  var spotify = new Spotify(keys.spotify);

  spotify
    .search({ type: "track", query: `"${value}"`, limit: "2" })
    .then(function (response) {

      for (let i = 0; i < response.tracks.items.length; i++) {
        // console.log(response.tracks.items[i]);
        const responseObj = response.tracks.items[i];
        const name = responseObj.name;
        const artists = responseObj.artists[0].name;
        const link = responseObj.preview_url;
        const album = responseObj.album.name;

        console.log(`------------------ \nArtist: ${artists} \nName of the song: ${name} \nPreview link: ${link} \nAlbum: ${album}`);
      }
    })
    .catch(function (error) {
      // console.log(error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

function showMovie() {
  let queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";
  axios
    .get(queryUrl)
    .then(function (response) {
      console.log(response.data);

      const title = response.data.Title;
      const year = response.data.Year;
      const rating = response.data.Rated;
      const rottenTomatoes = response.data.Ratings[1].Value;
      const country = response.data.Country;
      const lang = response.data.Language;
      const plot = response.data.Plot;
      const actors = response.data.Actors;

      console.log(`------------------ \nTitle: ${title} \nYear: ${year} \nRating: ${rating} \nRotten Tomatoes rating: ${rottenTomatoes} \nCountry: ${country} \nLanguage: ${lang} \nPlot: ${plot} \nActors: ${actors}`)
    })
    .catch(function (err) {
      console.log(err);
    });
};
