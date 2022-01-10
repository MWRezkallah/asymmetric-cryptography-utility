import { createAsymmetricKeyPair as createKeys } from "./createAsymmetricKeyPair";
import { readAsymmetricKeyPair as readKeys } from "./readAsymmetricKeyPair";
import { encryptSecret, decryptSecret } from "./encryptAndDecryptSecret";
import { signSecret, verifySecret } from "./signAndVerifySecret";

// phasephrase to cipher the private key using aes-256-cbc encryption algorithem
// get the passphrase for the encrypted private key
const passphrase = process.env.passphrase || "MiRezkPass";

// create the keys
createKeys(passphrase);

// read the keys
const { privateKey, publicKey } = readKeys();


// your application secret
const secret = process.env.secret || "this is a very secret string!";

// ciphering the secret with the private key
const cipheredSecret = encryptSecret(privateKey, passphrase, secret);

// deciphering the ciphered secret with the public key
const decipheredSecret = decryptSecret(cipheredSecret, publicKey);

// sign the secret with the private key
const signature = signSecret(secret, privateKey, passphrase);

// verify the signed secret with public key
const isVerified = verifySecret(secret, publicKey, signature);
