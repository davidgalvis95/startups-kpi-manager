export const SECRET = "You owe me a beer";
const CryptoJS = require("crypto-js");

export const encrypt = (plainText: string) => {
  var b64 = CryptoJS.AES.encrypt(plainText, SECRET).toString();
  var e64 = CryptoJS.enc.Base64.parse(b64);
  var eHex = e64.toString(CryptoJS.enc.Hex);
  return eHex;
};

export const decrypt = (cipherText: string) => {
  var reb64 = CryptoJS.enc.Hex.parse(cipherText);
  var bytes = reb64.toString(CryptoJS.enc.Base64);
  var decrypt = CryptoJS.AES.decrypt(bytes, SECRET);
  var plain = decrypt.toString(CryptoJS.enc.Utf8);
  return plain;
};
