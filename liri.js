var fs = require('fs');
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var keys = require('./keys.js');
var twitter = new Twitter(keys);

var userInput1 = process.argv[2];
var userInput2 = process.argv[3];
var dataText = process.argv[4];
// Twitter parameters
var params = { 
  "screen_name": "chris_lotkey",
  "count": 20
}
//Twitter Logic
if(userInput1 === "my-tweets"){
  twitter.get('statuses/user_timeline', params, gotData);
  function gotData(error, data, response){
    var tweets = data; //data is the object
    for(var i = 0; i < tweets.length; i++){
      console.log(tweets[i].text); 
      console.log(tweets[i].created_at); 
    }
  };
  outputText();
}
//OMDB Logic
if(userInput1 === "movie-this"){ 
    console.log(process.argv);
    var movieTitle = process.argv[3];
    request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&r=json&tomatoes=true",function (error, response, body){
        
        if(process.argv[3]){
        console.log(body);  
       
        }else{
            request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true",function(error, response,body){
                console.log(body);
            })
        }
    })

}
// get Spotify track
if(userInput1 === "spotify-this-song"){
    var songTitle = process.argv[3];
    spotify.search({ type: 'track', query: songTitle }, function(err, data){
        
        if(process.argv[3]){
            var data = data.tracks.items;
            for(var i =0; i < data.length; i++){
                
                console.log(data[i].name); //song track name
                console.log(data[i].album.href); //url 
                console.log(data[i].album.name); //album name
                console.log(data[i].preview_url); //preview link to the song
            
                for(var j =0; j < data[i].artists.length; j++){
                    console.log(data[i].artists[j].name); //artist's name
                }
            }
        }else{
            spotify.search({ type: 'track', query: "I Want It That Way"}, function(err, data){
                var data = data.tracks.items;
                console.log(data[0].name); //song track name
                console.log(data[0].album.href); //url 
                console.log(data[0].album.name); //album name
                console.log(data[0].preview_url); //preview link to the song
                console.log(data[0].artists[0].name); //artist's name
            });
        }
    });
    outputText();
}
//Read Text File Logic
if(userInput1 === "do-what-it-says"){
    fs.readFile('random.txt', "utf8", function(err, data){
        console.log(data);
    });
    outputText();
}   
function outputText(){
    fs.appendFile('log.txt', 'First Input: ' + userInput1 + '. Movie or Song Title: ' + userInput2 + '. Movie or Song info: ' + dataText + '.'); 
}