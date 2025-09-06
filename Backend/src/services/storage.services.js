const ImageKit = require("imagekit");
const { v4: uuidv4 } =require("uuid");
require("dotenv").config();




const imagekit = new ImageKit({
  publicKey : process.env.PUBLICKEY,
  privateKey : process.env.PRIVATE,
  urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (fileBuffer) => {
  const result = await imagekit.upload({
    file: fileBuffer,
    fileName: uuidv4(),
    folder: "mern14-products",
  });
  return result;
};

module.exports = { uploadFile };
