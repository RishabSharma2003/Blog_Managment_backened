import fs from 'fs';
import imageModel from '../models/imageModel.js';

export const uploadImage = async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ msg: 'File not found' });
        }

        // Read the uploaded file
        const filePath = 'uploads/' + req.file.filename;
        const fileData = fs.readFileSync(filePath);

        // Create and save the image model
        const saveImage = new imageModel({
            img: {
                data: fileData,
                contentType:req.file.mimetype
            }
        });

        await saveImage.save();
        console.log('Image is saved');

        res.status(200).json({
            stringURL:saveImage.img.data.toString('base64'),
            contentType:saveImage.img.contentType
        });
    } catch (error) {
        console.error('Error while uploading image:', error.message);
        res.status(500).json({ msg: `Error while uploading image: ${error.message}` });
    }
};
