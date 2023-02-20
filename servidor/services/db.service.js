const Image = require('../models/images');

const getImages = async (uuid) => {
	const images = await Image.find();
	return images;
}

const getImageById = async (uuid) => {
	const imageInfo = await Image.findOne({ uuid: uuid });
	return imageInfo;
}

const getImageBetweenDates = async (startDate, endDate) => {
	const images = await Image.find({
		created_at: {
			$gte: startDate,
			$lte: endDate
		}
	});
	return images;
}

const countImagesByHour = async () => {
	const images = await Image.aggregate([
		{
			$group: {
				_id: {
					$hour: "$createdAt"
				},
				count: { $sum: 1 }
			}
		}
	]);
	return images;
}

const saveImage = async (file, nombre, descripcion, autor, imageUrl, uuid) => {

	const newImage = new Image({
		uuid: uuid,
		nombre: nombre,
		descripcion: descripcion,
		autor: autor,
		originalNameImage: file.originalname,
		url: imageUrl
	});

	await newImage.save();
	return newImage;
}

module.exports = {
	getImages,
	getImageById,
	countImagesByHour,
	getImageBetweenDates,
	saveImage
}