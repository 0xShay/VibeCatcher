var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var result = sentiment.analyze('It was not that bad. Ive seen worse, its not the most horrible thing ive seen.');
console.dir(result);