import "dotenv/config";
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL  } from "@solana/web3.js";
import Validator from "./lib/validator"

// make sure we got a public key as input
let suppliedPublicKey = process.argv[2] || null;
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

//establish connection to the cluster
const connection = new Connection(clusterApiUrl("mainnet-beta"))

// validate input public key
let publicKey: PublicKey = await Validator.validatePublicKey(suppliedPublicKey, connection)

// check balance of the associated account and log it
const balance = await connection.getBalance(publicKey);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`✅ Finished! The balance of the account at \x1b[35m${publicKey}\x1b[0m is \x1b[32m ${balanceInSol} SOL\x1b[0m.`); 