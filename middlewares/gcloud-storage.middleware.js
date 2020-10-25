const { storage, getPublicUrl } = require('../services/gcloud-storage.service');

const DEFAULT_BUCKET_NAME = 'learn-287403.appspot.com';

exports.sendMultipleUploadToGCS = (req, res, next) => {
    if (!req.files) {
        return next();
    }

    const bucketName = DEFAULT_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);

    Promise.All(req.files.map(async file => {
        const gcsFileName = `${Date.now()}-${file.originalname}`;
        const fileAux = bucket.file(gcsFileName);

        const stream = fileAux.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        await stream.on('error', (err) => {
            file.cloudStorageError = err;
            // return err;
            // next(err);
        });

        stream.on('finish', async () => {
            file.cloudStorageObject = gcsFileName;

            file.gcsUrl = await fileAux.makePublic()
                .then(() => {
                    return getPublicUrl(bucketName, gcsFileName);

                });
        });

        stream.end(file.buffer);
        return file;
    })).then(files => {
        req.files = files;
    })
        .catch(err => {
            console.log(err);
            req.files = []
        });

    next();
};

exports.sendSingleUploadToGCS = (req, res, next) => {
    if (!req.file) {
        return next();
    }
 
    const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    const gcsFileName = `${Date.now()}-${req.file.originalname.split(' ').join('-')}`;
    const file = bucket.file(gcsFileName);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });
    
    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsFileName;

        return file.makePublic()
            .then(() => {
                req.file.gcsUrl = getPublicUrl(bucketName, gcsFileName);
                next();
            });
    });

    stream.end(req.file.buffer);
};
