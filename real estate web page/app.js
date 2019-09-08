"use strict";

const apiKey = '0d42de17149bf809e40bc3f98b42636a';
const city = 'Cluj-Napoca';
//const url = `http://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}?q=${city}`;
const url ='https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=b1b15e88fa797225412429c1c50c122a1';
const fetch = require('fetch');
const fetchUrl = fetch.fetchUrl;
fetchUrl(url, function (error, meta, body) {
    console.log(JSON.parse(body));
});

/* TODO

> https://www.npmjs.com/package/fetch

> https://openweathermap.org/current
*/

console.log("test");
