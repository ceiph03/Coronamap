//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const https = require("https");
const CSVToJSON = require ("csvtojson");
const fs = require("fs");

/*
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

*/

const startingword = "This is the current corona map."

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let posts = [];

//JSON data

CSVToJSON().fromFile("./CSV/03-11-2020.csv").then(source => {

  // console.log(source[0].Confirmed)
  // console.log(source.length)
  var n = source.length
  var confirmed = []
  var lat = []
  var lng = []

  for (i=0;i<n;i++){
    lat.push(source[i].Latitude)
    lng.push(source[i].Longitude)
    confirmed.push(source[i].Confirmed)
  }

  // print("confirmed numbers")
  console.log(confirmed.length)
  console.log(confirmed[0])

  locations = []
  for (i=1;i<lat.length;i++){
    for (j=0;j<confirmed[i];j++){
    locations.push("{lat: "+lat[i]+", lng: "+lng[i]+"}")
    // locations.push("test")
    // console.log(locations);

    }
  }
})


// web code


app.get("/", function(req, res) {

    console.log(locations[400], locations[401])


  res.render("home", {
    starting: startingword,
    posts: posts,
    locations: locations
  })
  // console.log(posts);
})



/*

app.get("/about", function(req, res) {
  res.render("about", {
    about: aboutContent
  })
})

app.get("/contact", function(req, res) {
  res.render("contact", {
    contact: contactContent
  })
})

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
})

app.get('/posts/:a', function(req, res) {
  const requestedTitle = _.lowerCase(req.params.a);
  posts.forEach(function(a) {
    const storedTitle = _.lowerCase(a.title);

    if (storedTitle === requestedTitle) {
      res.render('post',{
        title: a.title,
        content: a.content
      })
    }
  })
})
*/


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
