const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	uuid: {
		type: String,
		required: true,
	},
	originalNameImage: {
		type: String,
		required: true,
	},
	nombre: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
	},
	autor: {
		type: String,
	},
	url: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const Image = mongoose.model('ImageDB', imageSchema);
module.exports = Image;