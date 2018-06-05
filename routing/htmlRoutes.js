let axios = require("axios");
let cheerio = require("cheerio");

const SUBREDDIT = "breadstapledtotrees";

module.exports = function(app) {

    app.get("/", function(req, res) {

        axios.get(`https://www.reddit.com/r/${SUBREDDIT}`)
            .then(function(response) {

                let $ = cheerio.load(response.data);

                let entries = [];

                $(".entry .title .title").each(function(i, element) {
                    let result = {};

                    result.title = $(this)
                        .text();
                    result.link = $(this)
                        .attr("href");

                    entries.push(result);
                })

                res.json(entries);
            })
    })
}