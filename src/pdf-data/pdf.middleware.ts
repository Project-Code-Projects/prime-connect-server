import { v2 as cloudinary } from 'cloudinary';
import { PassThrough } from 'stream'; // Update the import statement for PassThrough

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dr3buczbc',
  api_key: '831329449195399',
  api_secret: 'btaBipINGy-1682Mzut_cMwr9qk',
});

export async function convertPDFBufferToImagesAndUpload(
  pdfBuffer: Buffer,
): Promise<string[]> {
  try {
    const pdf2img = require('pdf-img-convert'); // Import pdf-img-convert here
    const outputImages = await pdf2img.convert(pdfBuffer);
    const imageUrls: string[] = [];

    for (let i = 0; i < outputImages.length; i++) {
      const imageData = outputImages[i]; // Get image data (this may not necessarily be a Buffer)

      // Create a promise to handle the upload and get the URL
      const uploadPromise = new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'images',
            public_id: `image${i}`,
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

        // Pipe image data directly to Cloudinary upload stream
        const imageStream = new PassThrough(); // Use PassThrough from 'stream'
        imageStream.end(imageData); // Write image data to the stream
        imageStream.pipe(uploadStream); // Pipe image data to Cloudinary upload stream
      });

      // Wait for the upload to finish and get the URL
      const imageUrl = await uploadPromise;
      imageUrls.push(imageUrl);
    }

    return imageUrls;
  } catch (error) {
    console.error('Error converting PDF to images and uploading: ', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}
