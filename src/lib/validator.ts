import { resolve } from "@bonfida/spl-name-service";
import { Connection, PublicKey } from "@solana/web3.js";

export default class Validator 
{
    /**
     * Try to create a PublicKey from the input. If that fails, try to resolve it using Solana Name Service.
     * @param suppliedPublicKey 
     * @returns PublicKey
     */
    public static async validatePublicKey(suppliedPublicKey: string, connection: Connection): Promise<PublicKey> {
        // clean .sol adresses (.sol is not getting resolved)
        suppliedPublicKey = suppliedPublicKey.replace(".sol", "");

        let _publicKey: PublicKey;
        try {
            // try to create public key from input
            _publicKey = new PublicKey(suppliedPublicKey)
        } catch (error: any) {

            if (error.message == "Invalid public key input") {
                console.error("⚠️ The supplied public key is invalid! Trying to resolve it using Solana Name Service...");
            }

            // try to resolve public key using Solana Name Service
            try {
                _publicKey = await resolve(connection, suppliedPublicKey)
                console.log(`✅ Using Solana Name Service. \x1b[35m${suppliedPublicKey}.sol\x1b[0m resolves to \x1b[35m${_publicKey}\x1b[0m`); 
            } catch (error: any) {
                // neither worked => invalid input
                console.error("⚠️ It could not be resolved using Solana Name Service either! Please rerun the script with a valid public key or adress.");
                process.exit(1); 
            }
        }
        //@TODO: return null if neither worked, dont exit the process
        return _publicKey;
    }
}