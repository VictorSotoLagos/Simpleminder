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
  if (!text || !text.includes(":::")) {
    return text; // Si no tiene el formato esperado, devolver el texto tal cual (no encriptado)
  }
  try {
    const [iv, encryptedText] = text.split(":::");

    if (iv.length !== 32) {
      throw new Error("Invalid initialization vector");
    }
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Error desencriptando texto:", error.message);
    return text; // En caso de error, devolver el texto tal cual
  }
}



export { encrypt, decrypt };

