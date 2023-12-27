import "dotenv/config";
import { Connection, Transaction, Keypair, PublicKey, clusterApiUrl, sendAndConfirmTransaction, SystemProgram, LAMPORTS_PER_SOL  } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";
import Validator from "lib/Validator";

// make sure we got a public key as input (receiver)
let suppliedPublicKey = process.argv[2] || null;
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

//establish connection to the cluster
const connection = new Connection(clusterApiUrl("devnet"))

// acquire sender and receiver public keys
let receiverPublicKey: PublicKey = await Validator.validatePublicKey(suppliedPublicKey, connection)
let senderKeyPair: Keypair = getKeypairFromEnvironment("SECRET_KEY")

const LAMPORTS_TO_SEND = 1000000000;
console.log(`✅ Sending \x1b[32m${LAMPORTS_TO_SEND / LAMPORTS_PER_SOL} SOL\x1b[0m from \x1b[35m${senderKeyPair.publicKey}\x1b[0m to \x1b[36m${receiverPublicKey}\x1b[0m.`); 

// create transaction
const transaction = new Transaction().add(
    SystemProgram.transfer({
        fromPubkey: senderKeyPair.publicKey,
        toPubkey: receiverPublicKey,
        lamports: LAMPORTS_TO_SEND,
    })
);

// send and confirm transaction, log transaction signature
const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeyPair]);
console.log(`✅ Success! Transaction Signature: \x1b[32m${signature}\x1b[0m`);