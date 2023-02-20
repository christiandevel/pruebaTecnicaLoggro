require('dotenv').config({
	path: 'enviorement.env'
});

const AWS = require('aws-sdk');

// AWS config object with credentials
AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

// S3 Bucket instance
const s3 = new AWS.S3();

module.exports = s3;