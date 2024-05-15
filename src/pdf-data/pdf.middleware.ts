import { v2 as cloudinary } from 'cloudinary';
import { PassThrough } from 'stream';
import { randomBytes } from 'crypto'; // Import randomBytes for generating random strings

cloudinary.config({
  cloud_name: 'dr3buczbc',
  api_key: '831329449195399',
  api_secret: 'btaBipINGy-1682Mzut_cMwr9qk',
});

export async function convertPDFBufferToImagesAndUpload(
  pdfBuffer: Buffer,
): Promise<string[]> {
  try {
    const pdf2img = require('pdf-img-convert');
    const outputImages = await pdf2img.convert(pdfBuffer);

    const imageUrls: string[] = [];

    for (let i = 0; i < outputImages.length; i++) {
      const imageData = outputImages[i];

      const uniqueId = generateUniqueId();
      const publicId = `image_${uniqueId}_${Date.now()}`;

      const uploadPromise = new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'images',
            public_id: publicId,
            overwrite: true,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result) {
              resolve(result.secure_url);
            } else {
              reject('Upload failed, result is undefined.');
            }
          },
        );

        const imageStream = new PassThrough();
        imageStream.end(imageData);
        imageStream.pipe(uploadStream);
      });

      const imageUrl = await uploadPromise;
      console.log('Image URL: ', imageUrl);

      imageUrls.push(imageUrl);
    }

    return imageUrls;
  } catch (error) {
    console.error('Error converting PDF to images and uploading: ', error);
    throw error;
  }
}

function generateUniqueId(): string {
  return randomBytes(8).toString('hex');
}
