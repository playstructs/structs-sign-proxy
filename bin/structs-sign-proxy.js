#! /usr/bin/env node

import {DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
import {Secp256k1, sha256, Sha256} from "@cosmjs/crypto"

function bytesToHex(byteArray) {
    return Array.from(byteArray, byte => {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}


export class ProxySignature {
    constructor() {
        this.wallet;
        this.account;
        this.guildId = '';
        this.playerId = '';
        this.nonce = '';
        this.now_in_unix = '';
        this.message = '';
        this.digest;
        this.address = '';
        this.mnemonic = '';
        this.signatureType = '';
        this.signature;
        this.output = {};
    }

    // Initiate wallet
    async InitWallet() {
        this.wallet = await DirectSecp256k1HdWallet.fromMnemonic(
            this.mnemonic,
            {
                //hdPaths: stringToPath("m/44'/118'/0'/0/0"),
                prefix: "structs"
            }
        );

        const [account] = await this.getWalletAccounts();
        this.account = account;
        this.address = account.address;

        return this.wallet;
    }


    /*
     * getWalletAccounts()
     *
     * Use:
     *  const instance = new Player();
     *  await instance.init();
     *  const [firstAccount] = await instance.getAccounts();
     */
    async getWalletAccounts() {
        if (typeof this.wallet == 'undefined') {
            this.wallet = await this.getWallet();
        }

        return this.wallet.getAccountsWithPrivkeys();
    }

    getMessage(){
        if (this.signatureType == 'guild-join') {
            this.message = 'GUILD' + this.guildId + 'ADDRESS' + this.address + 'NONCE' + this.nonce
        else if (this.signatureType == 'guild-login') {
            this.message = 'LOGIN_GUILD' + this.guildId + 'ADDRESS' + this.address + 'DATETIME' + this.now_in_unix
        } else if (this.signatureType == 'address-register') {
            this.message = 'PLAYER' + this.playerId + 'ADDRESS' + this.address
        }
        return this.message
    }

    getDigest() {
        const encoded_proxy_message = new TextEncoder().encode(this.message)
        this.digest = sha256(encoded_proxy_message)
        return this.digest
    }

    async getSignature() {

        this.signature = await Secp256k1.createSignature(this.digest, this.account.privkey)

    }

    getHexPubKey() {
        return bytesToHex(this.account.pubkey);
    }

    getHexSignature() {
        return bytesToHex(proxySignature.signature.toFixedLength());
    }

    getOutput() {
        if (this.signatureType == 'guild-join') {
            this.output = {
                "guild_id": this.guildId,
                "address": this.address,
                "nonce": this.nonce,
                "pubkey": this.getHexPubKey(),
                "signature": this.getHexSignature(),
                "message": this.getMessage()
            }
        } else if (this.signatureType == 'guild-login') {
            this.output = {
                "guild_id": this.guildId,
                "address": this.address,
                "now_in_unix": this.now_in_unix,
                "pubkey": this.getHexPubKey(),
                "signature": this.getHexSignature(),
                "message": this.getMessage()
            }
        } else if (this.signatureType == 'address-register') {
            // PLAYER%sADDRESS%s
            this.output = {
                "player_id": this.playerId,
                "address": this.address,
                "pubkey": this.getHexPubKey(),
                "signature": this.getHexSignature(),
                "message": this.getMessage()
            }
        }
        return JSON.stringify(this.output)
    }

}

import { Command } from 'commander';
const program = new Command();

// Declare program name and description
program
    .name('structs-sign-proxy')
    .description('A small Structs utility for signing proxy messages')
    .version('0.1.0');

const proxySignature = new ProxySignature();

// Help options
program.command('guild-join')
    .description('Guild Join Proxy Message')
    .argument('<guild_id>', 'The Guild ID')
    .argument('<nonce>', 'The Nonce')
    .argument('<mnemonic>', 'The key')
    .action((guild_id, nonce, mnemonic) => {
        //console.log('Signing a Guild Join message')
        //console.log(guild_id + nonce)

        //console.log('💎💎Initializing wallet...')
        proxySignature.mnemonic = mnemonic;

        //console.log('💎💎Setting Message Type...')
        proxySignature.signatureType = 'guild-join'
        proxySignature.guildId = guild_id
        proxySignature.nonce = nonce

        //console.log('💎💎Setup Complete')


    });


// Help options
program.command('guild-login')
    .description('Guild Login Message')
    .argument('<guild_id>', 'The Guild ID')
    .argument('<now_in_unix>', 'A Recent Unix Timestamp')
    .argument('<mnemonic>', 'The key')
    .action((guild_id, now_in_unix, mnemonic) => {
        //console.log('Signing a Login message')
        //console.log(guild_id + now_in_unix)

        //console.log('💎💎Initializing wallet...')
        proxySignature.mnemonic = mnemonic;

        //console.log('💎💎Setting Message Type...')
        proxySignature.signatureType = 'guild-login'
        proxySignature.guildId = guild_id
        proxySignature.now_in_unix = now_in_unix

        //console.log('💎💎Setup Complete')

    });



// Help options
program.command('address-register')
    .description('Address Register Proxy Message')
    .argument('<player_id>', 'The Player ID')
    .argument('<mnemonic>', 'The key')
    .action((player_id, mnemonic) => {
        //console.log('💎Signing an Address Register message')

        //console.log('💎💎Initializing wallet...')
        proxySignature.mnemonic = mnemonic;

        //console.log('💎💎Setting Message Type...')
        proxySignature.signatureType = 'address-register'
        proxySignature.playerId = player_id

        //console.log('💎💎Setup Complete')
    });

program.parse();

//console.log('💎💎Initializing Wallet...')
await proxySignature.InitWallet()
//console.log('💎💎💎' + proxySignature.address)

//console.log('💎💎Building Message...')
proxySignature.getMessage()
//console.log('💎💎💎' + proxySignature.message)

//console.log('💎💎Signing Message...')
proxySignature.getDigest()
await proxySignature.getSignature()


//console.log('💎💎Encoding Pub Key...')

//console.log('💎💎💎'+ proxySignature.getHexPubKey());
//console.log('💎💎💎'+ proxySignature.getHexSignature());

//console.log('💎💎💎💎💎💎Output💎💎💎💎💎💎💎💎');
console.log(proxySignature.getOutput())