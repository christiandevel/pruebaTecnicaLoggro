
const { uploadToS3, getImageByIdFromS3 } = require('../services/aws.service');
const { saveImage, getImages, getImageById, countImagesByHour, getImageBetweenDates } = require('../services/db.service');
const { convertImageToPng } = require('../services/images.service');
const { v4: uuidv4 } = require('uuid');




const converImage = async (req, res) => {
	try {
		const { buffer } = req.file;
		const pngBuffer = await convertImageToPng(buffer);
		res.setHeader('Content-disposition', `attachment; filename=${req.file.originalname.replace(/\.[^/.]+$/, '')}.png`);
		res.set('Content-Type', 'image/png');
		res.send(pngBuffer);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: 'Error al convertir la imagen',
			error: error.message
		});
	}
}

const processImagePngToS3 = async (req, res) => {
	try {

		const uuid = uuidv4();
		const pngFileName = uuid + '-' + req.file.originalname.replace(/\.[^/.]+$/, "") + '.png';
		const { buffer } = req.file;
		const { nombre, descripcion, autor } = req.body;

		const pngBuffer = await convertImageToPng(buffer);
		const imageUrl = await uploadToS3({ buffer: pngBuffer, originalname: pngFileName, mimetype: 'image/png' }, uuid);

		await saveImage(req.file, nombre, descripcion, autor, imageUrl, uuid);

		res.send({
			message: 'Imagen subida correctamente',
			uuid: uuid,
			nombre: nombre,
			descripcion: descripcion,
			autor: autor,
			url: imageUrl,
			originalNameImage: req.file.originalname
		});

	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: 'Error al subir la imagen',
			error: error.message
		});
	}
}

const processImageToS3 = async (req, res) => {
	try {

		const uuid = uuidv4();
		const { nombre, descripcion, autor } = req.body;
		const imageUrl = await uploadToS3(req.file, uuid);

		await saveImage(req.file, nombre, descripcion, autor, imageUrl, uuid);

		res.send({
			message: 'Imagen subida correctamente',
			uuid: uuid,
			nombre: nombre,
			descripcion: descripcion,
			autor: autor,
			url: imageUrl,
			originalNameImage: req.file.originalname
		});

	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: 'Error al subir la imagen',
			error: error.message
		});
	}
}

const getImagesDb = async (req, res) => {
	try {
		const images = await getImages();
		res.send(images);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: 'Error al obtener las imagenes',
			error: error.message
		});
	}
}


const getImageByIdDb = async (req, res) => {
	try {
		const imageInfo = await getImageById(req.params.id);
		res.send(imageInfo);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: 'Error al obtener la imagen',
			error: error.message
		});
	}
}

const findImagesByHour = async (_, res) => {
	try {
		const counts = await countImagesByHour();
		res.json(counts);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: 'Error al contar imágenes por hora',
			error: error.message
		});
	}
}

const findImagesByDateRangeDb = async (req, res) => {
	try {

		const startDate = new Date(req.query.startDate);

		const endDate = new Date(req.query.endDate);
		endDate.setDate(endDate.getDate() + 1);


		// const { startDate, endDate } = req.query;
		const images = await getImageBetweenDates(startDate, endDate);
		res.json(images);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: 'Error al obtener las imagenes',
			error: error.message
		});
	}
}


const downloadImage = async (req, res) => {
	try {
		const imageId = req.params.id;
		const image = await getImageById(imageId);

		if (!image) {
			res.status(404).send({
				message: 'No se encontro la imagen'
			});
		}

		const imageBuffer = await getImageByIdFromS3(image);

		res.setHeader('Content-disposition', `attachment; filename=${image.originalNameImage}`);
		res.set('Content-Type', 'image/png');
		res.send(imageBuffer);

	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: 'Error al descargar la imagen',
			error: error.message
		});
	}
}

module.exports = {
	converImage,
	getImagesDb,
	getImageByIdDb,
	findImagesByDateRangeDb,
	findImagesByHour,
	processImageToS3,
	processImagePngToS3,
	downloadImage
}