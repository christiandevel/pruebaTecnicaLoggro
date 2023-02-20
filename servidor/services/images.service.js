const jimp = require('jimp');


const convertImageToPng = async (fileBuffer) => {
	try {
		const image = await jimp.read(fileBuffer);
		const imageBuffer = await image.getBufferAsync(jimp.MIME_PNG);
		return imageBuffer;
	} catch (error) {
		console.log(error);
		throw new Error('Error al convertir la imagen a PNG');
	}
}

module.exports = {
	convertImageToPng
}