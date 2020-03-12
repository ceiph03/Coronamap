const CSVToJSON = require ("csvtojson")
const JSONToCSV = require ("json2csv")
const FileSystem = require("fs")

CSVToJSON().fromFile("./CSV/03-11-2020.csv").then(source => {
  var data = console.log(source)
  })
