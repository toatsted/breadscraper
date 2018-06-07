module.exports = function(app) {

	app.get("/", (req, res) => {
		req.db.Entry.find({})
			.then(data => {
				res.render("index", {data: data});
			})
	});
}