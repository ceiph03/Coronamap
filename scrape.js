const request = require('request');
const cheerio = require('cheerio');

request('https://www.cdc.gov/coronavirus/2019-ncov/cases-in-us.html', (error,response,html) => {
  if (!error && response.statusCode == 200){
    const $ = cheerio.load(html)
    const siteHeading = $('.col-md-12');

    const output = siteHeading.find('li').text();

    console.log(output)
  }
})
