# structs-sign-proxy
A small Structs utility for signing proxy messages 

## Structs
In the distant future the species of the galaxy are embroiled in a race for Alpha Matter, the rare and dangerous substance that fuels galactic civilization. Players take command of Structs, a race of sentient machines, and must forge alliances, conquer enemies and expand their influence to control Alpha Matter and the fate of the galaxy.


# How to Use this...

## Address Register Message Signature

Used for generating the signature of an address that needs to be associated with an active player account.

```bash
./bin/structs-sign-proxy.js guild-join <guild_id> <player_join_nonce> "<mnemonic>"
```


## Guild Join Message Signature 

Used for generating the signature of an address that would like a guild to produce a transaction on their behalf.

```bash
./bin/structs-sign-proxy.js guild-join <guild_id> <player_join_nonce> "<mnemonic>"
```


# Learn more

- [Structs](https://playstructs.com)
- [Project Wiki](https://watt.wiki)
- [@PlayStructs Twitter](https://twitter.com/playstructs)


# License

Copyright 2024 [Slow Ninja Inc](https://slow.ninja).

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
