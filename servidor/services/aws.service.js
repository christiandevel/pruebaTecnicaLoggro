require('dotenv').config({
	path: 'enviorement.env'
});

const s3 = require('../config/aws');

// Upload image to S3
const uploadToS3 = async (file, uuid) => {
	const fileName = uuid + '-' + file.originalname;
	const s3Params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: fileName,
		Body: file.buffer,
		ContentType: file.mimetype,
		ACL: 'public-read',
	}
	const s3Response = await s3.upload(s3Params).promise();
	return s3Response.Location;
}

// Get image from S3
const getImageByIdFromS3 = async (image) => {
	try {
		if (!image) {
			throw new Error('Image not found');
		}

		const key = image.uuid + '-' + image.originalNameImage;
		const s3Params = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: key,
		};

		const s3Response = await s3.getObject(s3Params).promise();
		return s3Response.Body;
	} catch (error) {
		console.log(error);
		throw new Error('Error getting image from S3');
	}
};

module.exports = {
	uploadToS3,
	getImageByIdFromS3
};