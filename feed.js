const FeedParser = require('feedparser')
const request = require('request')

const urlTestFeed = "http://feeds.feedburner.com/pod-save-america"

function getFeed (urlfeed, callback) {
	var req = request (urlfeed)
	var feedparser = new FeedParser ()
	var feedItems = new Array ()
	req.on ("response", function (response) {
		var stream = this
		if (response.statusCode == 200) {
			stream.pipe (feedparser);
			}
		})
	req.on ("error", function (err) {
		console.log ("getFeed: err.message == " + err.message);
		})
	feedparser.on ("readable", function () {
		try {
			var item = this.read (), flnew
			if (item !== null) { //2/9/17 by DW
				feedItems.push (item)
				}
			}
		catch (err) {
			console.log ("getFeed: err.message == " + err.message);
			}
		})
	feedparser.on ("end", function () {
		callback (undefined, feedItems);
		})
	feedparser.on ("error", function (err) {
		console.log ("getFeed: err.message == " + err.message);
		callback (err)
		});
	}


    getFeed (urlTestFeed, function (err, feedItems) {
        if (!err) {
            function pad (num) { 
                var s = num.toString (), ctplaces = 3;
                while (s.length < ctplaces) {
                    s = "0" + s;
                    }
                return (s);
                }
            console.log ("There are " + feedItems.length + " items in the feed.\n");
            console.log(feedItems[0])
            }
        });