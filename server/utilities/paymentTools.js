const config = require("../config.json");

const sw3 = require("@solana/web3.js");
const BigNumber = require("bignumber.js");

const connection = new sw3.Connection(config["solana"]["endpoint"]);

function generateKeypair(secretKey=null) {
    if (secretKey != null) {
        return sw3.Keypair.fromSecretKey(secretKey);
    } else {
        return new sw3.Keypair();
    };
}

async function getBalance(publicKey) {
    const accountInfo = await connection.getAccountInfo(publicKey);
    return accountInfo?.lamports || 0;
}

function createTransaction(fromPubkey, toPubkey, lamports) {
    return new sw3.Transaction().add(
        sw3.SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports
        })
    );   
}

async function sendTransaction(transaction, keypairs) {
    return await sw3.sendAndConfirmTransaction(
        connection,
        transaction,
        keypairs
    );
}

module.exports = { generateKeypair, getBalance, createTransaction, sendTransaction };

// (async () => {

//     let signature = null;

//     try {
//         let aliceBalance = await getBalance(alice.keypair.publicKey);
//         let aliceToBobTx = createTransaction(alice.keypair.publicKey, bob.keypair.publicKey, BigNumber(aliceBalance)-BigNumber(5000));
//         signature = await sendTransaction(aliceToBobTx, [alice.keypair])
//     } catch(err) {
//         console.error(err);
//     };

//     console.log(signature);

//     signature = null;

//     try {
//         let bobBalance = await getBalance(bob.keypair.publicKey);
//         let bobToAliceTx = createTransaction(bob.keypair.publicKey, alice.keypair.publicKey, BigNumber(bobBalance)-BigNumber(5000));
//         signature = await sendTransaction(bobToAliceTx, [bob.keypair])
//     } catch(err) {
//         console.error(err);
//     };

//     console.log(signature);

// })();