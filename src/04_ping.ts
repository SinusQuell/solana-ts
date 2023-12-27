import web3 from "@solana/web3.js";
import "dotenv/config"
import base58 from "bs58";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers"
import TransactionsHelper from "lib/TransactionsHelper";

const payer = getKeypairFromEnvironment('SECRET_KEY')
const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

TransactionsHelper.sendPingTransaction(connection, payer)
.then((res) => {
    console.log(`✅ Success! View in Explorer: \x1b[35mhttps://explorer.solana.com/tx/${res}?cluster=devnet\x1b[0m`)
    process.exit(0)
})
.catch(err => {
    console.error("⚠️ Something went wrong!")
    console.error(err)
    process.exit(-1)
})

