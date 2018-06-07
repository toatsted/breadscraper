let axios = require("axios");
let cheerio = require("cheerio");

const SUBREDDIT = "breadstapledtotrees";

module.exports = function(app) {

	app.get("/scrape", (req, res) => {

		axios.get(`https://www.reddit.com/r/${SUBREDDIT}`)
			.then(response => {

				let $ = cheerio.load(response.data);


				$(".entry .title .title").each(function(i, element) {
					let result = {};

					result.title = $(this)
						.text();
					result.link = $(this)
						.attr("href");

					req.db.Entry.create({
						title: result.title,
						link: result.link
					});
				})

				res.send("Scraping done");
			})
			.catch(err => console.log(err))
	})	
}