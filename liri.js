//TODO: is moment working right??

//include
require('dotenv').config();
var fs = require('fs');
var axios = require('axios');
var moment = require('moment');
const Spotify = require('node-spotify-api');
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);

//search requirements
var search = process.argv.slice(3).join(" ")
var command = process.argv[2]

//idea will be to use inquire prompts to make this re-usable, but not until the whole thing works
if (command === "concert-this") {
    concertThis(search);
} else if (command === "spotify-this-song") {
    spotifyThis(search);
} else if (command === "movie-this") {
    movieThis(search);
}

function movieThis() {
    console.log("Finding what movie this is.")
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("The movie's rating is: ", response.data);
        }
    );
}

function spotifyThis() {
    console.log("Get spotified")
    console.log(search)
    //here the search goes
    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //return: artist(s), song name, a preview link, the song's album
        for (let i = 0; i < data.tracks.items[0].artists; i++) {
            console.log("Artists include: " + data.tracks.items[0].artists[i])
        }
        console.log("Track name: " + data.tracks.items[0].name)
        console.log("Preview link: " + data.tracks.items[0].href)
        console.log("Album title: " + data.tracks.items[0].album.name)
    });
}

function concertThis() {
    var bitURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"

    axios.get(bitURL)
        .then(function (response) {
            if (response.data.length === 0) {
                console.log("they aren't touring, GET OUT")
            }
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
                console.log("Venue: " + response.data[i].venue.name)
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country)
                console.log("Date playing here: " + moment(response.data.datetime).format('YYYY MM DD'))
                //Use FS here to export to file
            }
        })
}