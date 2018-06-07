let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let EntrySchema = new Schema({
	title: {
		type: String,
		required: true
	},

	link: {
		type: String,
		required: true,
	}
})

let Entry = mongoose.model("Entry", EntrySchema);

module.exports = Entry;