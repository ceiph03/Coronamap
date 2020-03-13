let obj = {
  firstName: "Steven",
  lastName: "Hancock",
  score: 80
}

let fs = require('fs'), jsonData=JSON.stringify(obj);

console.log(jsonData)
console.log(obj)
