//====================================================//
//                   WELCOME TO LIRI                 //
//===================================================//

// requiriment //
var Twitter = require('twitter'); // will use the package from Twitter
var Spotify = require('node-spotify-api'); // will use the package from Spotify
var request = require('request'); // Will use the npm request API
var fs = require('fs'); // Library use to manipulate Files, read and write 
//**************************************** 
var action = process.argv[2]; // Read the action from the user
var collector = process.argv; // Read the argument from the user
// Customer choise collector/////
var collector_array = "";
for (var v = 3; v < collector.length; v++) {
    collector_array += collector[v] + " ";
}
/////////////////////////////////

// ====================Action selector=========================// 
switch (action) {
    //User choice Tweeter
    case 'my-tweets':
        get_twitter();
        break;
    case 'spotify-this-song':
        //user choice search a song
        if (collector_array != "") {
            search_spotify(collector_array);
        } else {
            search_spotify("The Sign Ace of Base");
        }
        break;
    case 'movie-this':
        //user choice search a movie
        if (collector_array != "") {
            search_movie(collector_array);
        } else {
            search_movie('Mr. Nobody');
            console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>");
            console.log("It's on Netflix!");
        }
        break;
    case 'do-what-it-says':
        // Is selecting the function and will read from the file random.txt
        do_what_it_says();
        break;
    default:
        console.log("WRONG CHOISE . I'm here to help you");
        break;
}

//===================================================================//


//==========================HERE IS THE TWITTER SECTION===============================


function get_twitter() {
    var TwittKey = require("./keys.js");
    var client = new Twitter(TwittKey); // Will load the function of twitter using the npm
    var twitter_save_log = [];
    twitter_save_log.push("***Twitter Save Results***");
    client.get('favorites/list', function(error, tweets, response) {
        if (!error) {
            console.log("=======Here is Twitter Results====")
            for (var i = 0; i < tweets.length; i++) {
                console.log("==========Date Created============")
                console.log(tweets[i].created_at); // Printing the Date of creation 
                twitter_save_log.push(tweets[i].created_at);
                console.log("==========Message==========+++++==")
                console.log(tweets[i].user.description); // Printing the description
                twitter_save_log.push(tweets[i].user.description);
            }
            loginto_txt(twitter_save_log); // This action in printing insede the log.txt

        } else {
            console.log(error);
        }

    })

}
// =================================================================================
//                                Spotify Performance
// =================================================================================

function search_spotify(song) {
    //Requeriments and declaration 
    var spotify_key = require("./spotify_key");
    var spotify_key_client = new Spotify(spotify_key);
    var spotify_save_log = [];
    spotify_save_log.push("***SAVING RESULTS FROM SPOTIFY");
    //spotify call
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
                spotify_save_log.push("Artist Name: " + results[j].album.artists[0].name)
                console.log("Song Name: " + results[j].name);
                spotify_save_log.push("Song Name: " + results[j].name);
                console.log("Preview the Song: " + results[j].external_urls.spotify);
                spotify_save_log.push("Preview the Song: " + results[j].external_urls.spotify)
                console.log("Album Name: " + results[j].album.name);
                spotify_save_log.push("Album Name: " + results[j].album.name);
                console.log("==================================================")
            }
            loginto_txt(spotify_save_log); // Saving the query into the log.txt
        }
    })
}
// =================================================================================
//                                 OMDB API 
// =================================================================================

function search_movie(movie_name) {
    var movie_save_log = []; //log variable to be use and save the result into the log.txt
    movie_save_log.push("***MOVIE SAVE LOG***");
    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movie_name, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var movie_result = JSON.parse(body);
            console.log("=====================OMDB SEARCH===================")
            console.log("* Title of the movie: " + movie_result.Title);
            movie_save_log.push(movie_result.Title);
            console.log("* Year the movie came out: " + movie_result.Year);
            movie_save_log.push(movie_result.Year);
            console.log("* IMDB Rating of the movie: " + movie_result.imdbRating);
            movie_save_log.push(movie_result.imdbRating)
                // Here would check if the Tomato Rating Exist
            if (movie_result.Ratings.length > 1) {
                console.log("* Rotten Tomatoes Rating of the movie: " + movie_result.Ratings[1].Value);
                movie_save_log.push(movie_result.Ratings[1].Value);
            } else {
                console.log("* Rotten Tomatoes Rating of the movie: NOT RATING");
            }
            console.log("* Country where the movie was produced: " + movie_result.Country);
            movie_save_log.push(movie_result.Country);
            console.log("* Language of the movie: " + movie_result.Language);
            movie_save_log.push(movie_result.Language);
            console.log("* Plot of the movie: " + movie_result.Plot);
            movie_save_log.push(movie_result.Plot);
            console.log("* Actors in the movie: " + movie_result.Actors);
            movie_save_log.push(movie_result.Actors);
            console.log("===================================================");
        } else {
            console.log(error);
        }
        loginto_txt(movie_save_log);
    })
}

// =======FUNCTION THAT WOULD CALL DO WHAT IT SAYS=======//
function do_what_it_says() {
    // Will read the file Random.txt
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        } else {
            // Read the file and only use the second argument 
            dataarr = data.split(",");
            search_spotify(dataarr[1]);
        }
    })
}

function loginto_txt(saving_array) {
    var timer = new Date; // Time declaration to stamp the date and time into the log
    var file = "log.txt";
    console.log(timer);
    // Firts section will create the Time Stamp//
    fs.appendFile(file, timer + "\n", function(error) {
            if (error) {
                console.log(error);
            }
        })
        //Would go into the array and save the result
    for (var r = 0; r < saving_array.length; r++) {
        results = "============================\n" + saving_array[r] + "\n";
        fs.appendFile(file, results, function(error) {
            if (error) {
                console.log(error);
            }
        })
    }
}