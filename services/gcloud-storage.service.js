const { Storage } = require('@google-cloud/storage');

const gcloud_storage = new Storage({  
    projectId: 'learn-287403',
    keyFilename: './services/learn-287403-ff18c35a8cd1.json' 
});



exports.storage = gcloud_storage;
exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName.split(' ').join('-')}`;

