const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
require('dotenv').config({
	path: 'enviorement.env'
});

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
		process.exit(1); // Exit process with failure
	}
}

module.exports = connectDb;