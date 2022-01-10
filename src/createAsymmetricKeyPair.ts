import { generateKeyPairSync, RSAKeyPairOptions } from "crypto";
import { join } from "path";
import { writeFileSync, existsSync, mkdirSync } from "fs";

export const createAsymmetricKeyPair = (passphrase: string, kPath="keys") => {
  // options for the generate asymmetric keypair
  const rsaKeyPairOptions: RSAKeyPairOptions<"pem", "pem"> = {
    modulusLength: 4096,
    publicKeyEncoding: {
      format: "pem",
      type: "spki",
    },
    privateKeyEncoding: {
      format: "pem",
      type: "pkcs8",
      cipher: "aes-256-cbc",
      passphrase: passphrase,
    },
  };

  // generate asymmetric the key pair
  const { privateKey, publicKey } = generateKeyPairSync(
    "rsa",
    rsaKeyPairOptions
  );

  // write the key pairs into pub.key and priv.key files
  const keysPath = join(__dirname, kPath);
  if (!existsSync(keysPath)) {
    mkdirSync(keysPath, { recursive: true });
    writeFileSync(join(keysPath, "pub.key"), publicKey);
    writeFileSync(join(keysPath, "priv.key"), privateKey);
  }
};
