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
let cases = [] // global var
CSVToJSON().fromFile("./csv/03-13-2020.csv").then(source => {
      for (i = 0; i < source.length; i++) {
        locations.push("{lat: " + source[i].Latitude + ", lng: " + source[i].Longitude + "}")
      }

      for (j = 0; j < source.length; j++) {
        cases.push(source[j].Confirmed.toString())
      }

  // console.log(locations.slice(0,10));
  // console.log(locations.length)
  // console.log(cases.slice(0,10));
  // console.log(cases.length);
  // console.log(source.length);
  // console.log(cases);
})

// web code
app.get("/", function(req, res) {

  res.render("home", {
    starting: startingword,
    posts: posts,
    locations: locations,
    cases: cases
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
