//====================================================//
//                   WELCOME TO LILI                 //
//===================================================//

// requiriment //
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
//**************************************** 
//This 'client' variable contain the token to be able to use twitter 

//==========================HERE IS THE TWITTER SECTION===============================
var TwittKey = require("./keys.js");

function get_twitter() {
    var client = new Twitter(TwittKey); // Will load the function of twitter using the npm

    client.get('favorites/list', function(error, tweets, response) {
        if (!error) {
            console.log("=======Here is Twitter Results====")
            for (var i = 0; i < tweets.length; i++) {
                console.log("==========Date Created============")
                console.log(tweets[i].created_at); // Printing the Date of creation 
                console.log("==========Message==========+++++==")
                console.log(tweets[i].user.description); // Printing the description
            }

        } else {
            console.log(error);
        }
    })
}
// =================================================================================
//                                Spotify Performance
// =================================================================================
var spotify_key = require("./spotify_key");
var spotify_key_client = new Spotify(spotify_key);

function search_spotify(song) {
    spotify_key_client.search({
        type: "track",
        query: song,
        limit: "5"
    }, function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var results = data.tracks.items;
            console.log("=============Spotify 5 Top Results================")
            for (var j = 0; j < results.length; j++) {
                console.log("==================================================")
                console.log("Artist Name: " + results[j].album.artists[0].name);
                console.log("Song Name: " + results[j].name);
                console.log("Preview the Song: " + results[j].album.external_urls.spotify);
                console.log("Album Name: " + results[j].album.name);
                console.log("==================================================")
            }
        }
    })
}
// search_spotify("Levanto mis manos");

// =================================================================================
//                                 OMDB API 
// =================================================================================

function search_movie(movie_name) {
    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movie_name, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var movie_result = JSON.parse(body);
            console.log("=====================OMDB SEARCH===================")
            console.log("* Title of the movie: " + movie_result.Title);
            console.log("* Year the movie came out: " + movie_result.Year);
            console.log("* IMDB Rating of the movie: " + movie_result.imdbRating);
            console.log("* Rotten Tomatoes Rating of the movie: " + movie_result.Ratings[1].Value);
            console.log("* Country where the movie was produced: " + movie_result.Country);
            console.log("* Language of the movie: " + movie_result.Language);
            console.log("* Plot of the movie: " + movie_result.Plot);
            console.log("* Actors in the movie: " + movie_result.Actors);
            console.log("===================================================");
        } else {
            console.log(error);
        }
    })
}
search_movie("Star Wars");