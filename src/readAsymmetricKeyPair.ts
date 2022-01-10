import { join } from "path";
import { readFileSync } from "fs";

export const readAsymmetricKeyPair = () => {
  const keysPath = join(__dirname, "keys");
  const pubKey = readFileSync(join(keysPath, "pub.key")).toString();
  const privKey = readFileSync(join(keysPath, "priv.key")).toString();

  return { publicKey: pubKey, privateKey: privKey };
};
