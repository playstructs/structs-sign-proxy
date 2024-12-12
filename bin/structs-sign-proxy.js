#! /usr/bin/env node

// Import commander
const { Command } = require('commander');
const program = new Command();

// Declare program name and description
program
    .name('structs-sign-proxy')
    .description('A small Structs utility for signing proxy messages')
    .version('0.1.0');

// Help options
program.command('guild-join')
    .description('Guild Join Proxy Message')
    .argument('<guild_id>', 'The Guild ID')
    .argument('<nonce>', 'The Nonce')
    .argument('<mnemonic>', 'The key')
    .action((guild_id, nonce, mnemonic) => {console.log(guild_id + nonce + mnemonic)})



// Help options
program.command('address-register')
    .description('Address Register Proxy Message')
    .argument('<player_id>', 'The Guild ID')
    .argument('<mnemonic>', 'The key')

program.parse();

console.log("Yep")


//Parameters

// Type [guild join, address register]
// Mnemonic

// Player ID

// Guild ID
// Nonce


// Initiate wallet

// Get account

// Build message

// Sha256 msg

// sign message

// encode results

// encode pub key


// output as json?


