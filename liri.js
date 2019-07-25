require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require("axios");

const action = process.argv[2];
const nodeArgs = process.argv;
let value = "";

// loop through all the words in the node argument
// add "+" in between arguments
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
  doWhatItSays ();
  break;
}


function showSpotify() {
  var spotify = new Spotify(keys.spotify);

  spotify
    .search({ type: "track", query: `"${value}"`, limit: "2"})
    .then(function(response) {

      for (let i = 0; i < response.tracks.items.length; i++) {
        // console.log(response.tracks.items[i]);
        const responseObj = response.tracks.items[i];
        const name = responseObj.name;
        const artists = responseObj.artists[0].name;
        const link = responseObj.preview_url;
        const album = responseObj.album.name;
        
        console.log(`------------------ \nThe artist: ${artists} \nThe name of the song: ${name} \nA preview link: ${link} \nThe album: ${album}`);
      }
    })
    .catch(function(error) {
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



