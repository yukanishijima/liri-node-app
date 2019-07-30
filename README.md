# LIRI Bot

LIRI stands for a Language Interpretation and Recognition Interface. LIRI is a command line node app that will help you search for concerts, music, and movies on your terminal! Responding to your command line, she’ll take in parameters and give you back the data.  

## How to use

With the command ```node liri.js```, you will be welcomed by LIRI and given 4 commands to use this app. 

![gif](https://github.com/yukanishijima/liri-node-app/blob/master/images/introduction.gif/)  

### Search for concerts

Enter a name of an artist followed by the command ```node liri.js concert-this```, LIRI will search for concerts using the Bands in Town API and give you back the data. The date of the concert will be in the format of DD/MM/YYYY. 

![image](https://github.com/yukanishijima/liri-node-app/blob/master/images/concert-this-1.png)

If you don’t enter any artist, LIRI will remind you to enter it. 

![image](https://github.com/yukanishijima/liri-node-app/blob/master/images/concert-this-2.png)

### Search for music

Enter a name of a song followed by the command line ```node liri.js spotify-this-song```, LIRI will search for the song using the spotify API and give you the top 2 search results of the song. 

![image](https://github.com/yukanishijima/liri-node-app/blob/master/images/spotify-this-song-1.png)

If no song is provided after the command line, LIRI will show you the default search result of “I miss the things” by Lars Behrenroth & Sinan Baymak. 

![image](https://github.com/yukanishijima/liri-node-app/blob/master/images/spotify-this-song-2.png)

### Search for movies

Enter a name of a movie followed by the command ```node liri.js movie-this```, LIRI will use axios to retrieve data from the OMDB API and display it for you on the terminal. 

![image](https://github.com/yukanishijima/liri-node-app/blob/master/images/movie-this-1.png)

If there’s no movie provided after the command line, you will be given a search result of “Kill Bill” as a default. 

![image](https://github.com/yukanishijima/liri-node-app/blob/master/images/movie-this-2.png)

### Surprise!

The command line ```node liri.js do-what-it-says``` will read random.txt, take in the command line that is written there, and give you the search result of whatever the command line says. LIRI uses the fs Node package for this feature.

At the moment, the random.txt includes the following line, however you can change this to display a different surprise result!

spotify-this-song, “I Want it That Way”  

![image](https://github.com/yukanishijima/liri-node-app/blob/master/images/do-what-it-says.png)

## Technologies & Resources  
```
- Javascript
- Node.js
- npm
 - axios: "^0.19.0"
 - dotenv: "^8.0.0"
 - moment: "^2.24.0"
 - node-spotify-api: "^1.1.1"
- OMDB API
- Bands in Town API
```

## Note

- To use LIRI Bot, you must get your own spotify ID and spotify secret at [Spotify API](https://developer.spotify.com/my-applications/). Then creat a file named .env, add the follwoing to it, and replace the values with your API keys.
```
SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```

- This is a part of weekly assignments from UofT Full Stack Web Development Bootcamp 2019.  

