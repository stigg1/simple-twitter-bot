// requirements
var twitter = require('twitter');
var config = require('./config.js');
var twitBot = new twitter(config);
var colors = require ('colors');

// TGInquisitor Bot
console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-'.red);
console.log('TGInquisitor Is Alive Mother Fucker!!'.yellow);
console.log('-==-==-==-==-==-==-==-'.red + '0.0.3'.bold.blue +'-==-==-==-'.red);

// search 10 results via hashtags
// var hashSearchold = { q: "#fuckitall OR #ericandre OR #theericandreshow OR #powergenitalia OR #iasip", count: 15, result_type: "recent" };
var hashSearch = {
	q:
        '#fuckitall OR #ericandre OR #theericandreshow OR #iasip OR #legalizeranch',
	count: 15,
	result_type: "recent"
};

// retweet latest tweets from the hashSearch
function retweetFresh() {
	twitBot.get('search/tweets', hashSearch, function (error, data, response) {
		if (!error) {
			var freshTweetId = data.statuses[0].id_str;
			console.log('Found Tweet: '.bold.magenta + freshTweetId)
			twitBot.post('statuses/retweet/' + freshTweetId, { }, function (error, response) {
				if (response) {
					console.log('Re-Tweeting: '.bold.yellow + freshTweetId + ' ?'.bold.yellow);
				}
				if (error) {
					console.log('Twitter Error:'.bold.red, error);
				}
			})
		}
		else {
			console.log('Hashtag Search Error:'.bold.red, error)
		}
	});
}

retweetFresh();
// then every hour if not a repost in milliseconds
setInterval(retweetFresh, 1000 * 60 * 60);
