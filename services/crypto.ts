import CryptoJS from "crypto-js";

export const encrypt = (value: string) => {
  const cipherText = CryptoJS.AES.encrypt(
    value,
    process.env.NEXT_PUBLIC_AES_SECRET_KET || ""
  ).toString();

  return cipherText;
};

export const decrypt = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(
    cipherText,
    process.env.NEXT_PUBLIC_AES_SECRET_KET || ""
  );
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
};
