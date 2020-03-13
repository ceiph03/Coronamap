//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const https = require("https");
const CSVToJSON = require ("csvtojson");
const fs = require("fs");

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
// var locations = require("./JSON/data.json")
let locations = [] // global var
CSVToJSON().fromFile("./CSV/03-11-2020.csv").then(source => {
      for (i = 1; i < source.length; i++) {
        for (j = 0; j < source[i].Confirmed; j++) {
          locations.push("{lat: " + source[i].Latitude + ", lng: " + source[i].Longitude + "}")    }
  }
  console.log(locations.slice(0,5));
})


// web code
app.get("/", function(req, res) {

  res.render("home", {
    starting: startingword,
    posts: posts,
    locations: locations
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
