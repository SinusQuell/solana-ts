import "dotenv/config";
import { Connection, Transaction, Keypair, PublicKey, clusterApiUrl, sendAndConfirmTransaction, SystemProgram  } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";
import Validator from "./lib/validator"

// make sure we got a public key as input (receiver)
let suppliedPublicKey = process.argv[2] || null;
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

//establish connection to the cluster
const connection = new Connection(clusterApiUrl("devnet"))

// acquire sender and receiver public keys
let receiverPublicKey: PublicKey = await Validator.validatePublicKey(suppliedPublicKey, connection)
let senderPublicKey: PublicKey = getKeypairFromEnvironment("SECRET_KEY").publicKey

console.log(`✅ Sending \x1b[32m1 SOL\x1b[0m from \x1b[35m${senderPublicKey}\x1b[0m to \x1b[36m${receiverPublicKey}\x1b[0m.`); 

// // create transaction
// const transaction = new Transaction().add(
//     SystemProgram.transfer({
//         fromPubkey: senderPublicKey,
//         toPubkey: receiverPublicKey,
//         lamports: 1 * 1000000000,
//     })
// );