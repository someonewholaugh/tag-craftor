import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_ENCRYPT_SECRET_KEY;

export const encryptValue = (value) => {
  if (!secretKey) return value;
  const encrypted = CryptoJS.AES.encrypt(value, secretKey).toString();
  return encrypted;
};

export const decryptValue = (encryptedValue) => {
  if (!secretKey) return encryptedValue;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error decrypting value', error);
    return null;
  }
};
