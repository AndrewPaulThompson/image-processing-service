const sharp = require('sharp')
const { Readable } = require('stream')

const processImage = async (image) => {
    const processed = await sharp(image)
        .rotate(180)
        .resize(200)
        .toBuffer()

    const readable = new Readable()
    readable.push(processed)
    readable.push(null)
  
    return readable
}

module.exports = { processImage }
