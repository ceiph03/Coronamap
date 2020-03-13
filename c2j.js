const CSVToJSON = require ("csvtojson");
const fs = require("fs");

//JSON data
var locations = [];

CSVToJSON().fromFile("./CSV/03-11-2020.csv").then(source => {
     locations = [];
      for (i = 0; i < source.length; i++) {
        for (j = 0; j < source[i].Confirmed; j++) {
          locations.push("{lat: " + source[i].Latitude + ", lng: " + source[i].Longitude + "}")    }
  }

  fs.writeFile("./JSON/data.json", JSON.stringify(locations), function(err){
    if (err) {
      console.log(err);
    }
  });

});
