import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY 
const ALGORITHM = "aes-256-cbc";

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":::" + encrypted;
};

const decrypt = (text) => {
  if (!text || !text.includes(":")) {
    return text;
  }
  const [iv, encryptedText] = text.split(":");
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, "hex"));
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export { encrypt, decrypt };

