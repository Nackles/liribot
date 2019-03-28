//TODO: is moment working right??
//TODO: activity 14 for fs.write

//includes
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

//make sure search has a default
if (!search || search === undefined) {
    search = "Mr Nobody";
}

//idea will be to use inquire prompts to make this re-usable, but not until the whole thing works
if (command === "concert-this") {
    concertThis(search);
} else if (command === "spotify-this-song") {
    spotifyThis(search);
} else if (command === "movie-this") {
    movieThis(search);
} else if (command === "do-what-it-says") {
    doWhat(command, search);
}

//run spotify-this-song for I Want It That Way from random.txt
function doWhat() {
    var txtArr = []
    fs.read("random.txt", "utf8", function (err, data) {
        if (err) {
            return err
        }
        txtArr = data.split(",");
    }).then(function(data){
    command = textArr[0]
    search = textArr[1]

    spotifyThis(command, search)
    })
}

//search OMDB for target movie and return certain values
function movieThis() {
    console.log("Finding what movie this is.")
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

            console.log("Movie info below!")
            console.log("Movie name: ", response.data.Title);
            console.log("Movie released: ", response.data.Year);
            if (response.data.Ratings[0]) {
                console.log("IMDB Rating: ", response.data.Ratings[0]);
            } else {
                console.log("UNRATED: by IMDB")
            }
            if (response.data.Ratings[1]) {
                console.log("Rotten Tomatoes rating: ", response.data.Ratings[1]);
            } else {
                console.log("UNRATED: by Rotten Tomatoes")
            }
            console.log("Made in this country:", response.data.Country)
            console.log("Movie language:", response.data.Language)
            console.log("Plot Summary:", response.data.Plot)
            console.log("Actors in movie:", response.data.Actors)
        }
    );
}

//search spotify for target track and return certain values
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

//search bandsintown for a band and display if it is not touring, or where they are touring
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