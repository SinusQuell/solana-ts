import web3 from "@solana/web3.js";

export default class TransactionHelper 
{

  static PING_PROGRAM_ADDRESS = new web3.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa')
  static PING_PROGRAM_DATA_ADDRESS =  new web3.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod')

  /**
   * Send a ping transaction to the ping program and return the transaction signature
   * @param connection 
   * @param payer 
   * @returns 
   */
  public static async sendPingTransaction(connection: web3.Connection, payer: web3.Keypair): Promise<web3.TransactionSignature> {
    
      console.log(`✅ Sending ping transaction to \x1b[35m${this.PING_PROGRAM_ADDRESS}\x1b[0m ...`);
      // create transaction
      const transaction = new web3.Transaction().add(new web3.TransactionInstruction({
          keys: [
            {
              pubkey: this.PING_PROGRAM_DATA_ADDRESS,
              isSigner: false,
              isWritable: true
            },
          ],
          programId: this.PING_PROGRAM_ADDRESS
        })
      );
      // send and confirm transaction, return transaction signature
      return await web3.sendAndConfirmTransaction(connection, transaction, [payer]);
  }
}