const ImageKit = require("imagekit");
const { v4: uuidv4 } =require("uuid");
require("dotenv").config();

const imagekit = new ImageKit({
  publicKey : "public_eC5/IKVbuqvUw5xKjfCvLigCeUw=",
  privateKey : "private_/VH+bFujj//GRL9cMBMeKaYA0ag=",
  urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadImage = async (fileBuffer) => {
  const result = await imagekit.upload({
    file: fileBuffer,
    fileName: uuidv4(),
    folder: "mern14-products",
  });
};

module.exports = { uploadImage };
