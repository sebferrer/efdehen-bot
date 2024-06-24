# Efdehen Bot

All-purpose bot for the "Fleurs de Nantes" Discord server.

Currently just providing automated polls.

A classic poll is a poll in which the bot automatically reacts to the message with the emojis defined in the configuration.

A numbered poll is a poll in which the bot automatically reacts with the emojis from x to y when the pattern `(x-y)` is detected in a Discord message.

For example, `(1-9)` will make the bot react to the message with the emojis `:one:`, `:two:`, ..., `:nine:` ; `(2-4)` will make the bot react to the message with the emojis `:two:`, `:three:`, `:four:`.

## Getting Started

### Define your Token, Client ID and Guild ID

Create an .env file at the root of your project and define your Discord bot token, Client ID and Guild ID in a variable as following:
```shell
TOKEN="Your_token_here"
CLIENT_ID="Your_client_id_here"
GUILD_ID="Your_guild_id_here"
```

### Configuration

The `src/config.json` file provides a detailed overview of the configuration settings for the polls feature.

The configuration includes settings for both classic and numbered polls. 

<details>
  <summary><strong>Documentation</strong></summary>

  ### Classic Polls
  
  - **Enabled**: To enable/disable the classic polls feature.
  - **All Channels**: If `true`, the classic polls will be activated for each channel to which the bot has access.
  - **Sub Channels**: If `true`, the classic polls will be activated for each sub-channel of the channels defined in the configuration.
  - **Channels**: Specific channels where classic polls are enabled.
      - **ID**: The Discord channel ID.
      - **Label**: A label for this channel (whatever you want).
  - **Emojis**: Emojis used in classic polls.
      - **Standard**: If `true`, allows the use of the custom emojis added to the targeted Discord server.
      - **id**: The ID of the Discord emoji.
  - **Keywords**: Keywords that trigger the creation of classic polls in Discord messages: `(sondage)`, `(poll)`.

  ### Numbered Polls
  
  - **Enabled**: To enable/disable the numbered polls feature.
  - **All Channels**: If `true`, the classic polls will be activated for each channel to which the bot has access.
  - **Sub Channels**: If `true`, the classic polls will be activated for each sub-channel of the channels defined in the configuration.
  - **Channels**: Specific channels where numbered polls are enabled.
      - **ID**: The Discord channel ID.
      - **Label**: A label for this channel (whatever you want)`.
  
</details>

```json
{
    "polls": {
        "classic": {
            "enabled": true,
            "allChannels": false,
            "subChannels": true,
            "channels": [
                {
                    "id": "<channel-id>",
                    "label": "My channel"
                }
            ],
            "emojis": [
                {
                    "standard": false,
                    "id": "Yes"
                },
                {
                    "standard": false,
                    "id": "Maybe"
                },
                {
                    "standard": false,
                    "id": "No"
                }
            ],
            "keywords": [
                "(sondage)",
                "(poll)"
            ]
        },
        "numbered": {
            "enabled": true,
            "allChannels": false,
            "subChannels": true,
            "channels": [
                {
                    "id": "<channel-id>",
                    "label": "My channel"
                }
            ]
        }
    }
}
```

### Install dependencies

```shell
npm install
```

### Build

```shell
npm run build
```

### Run

```shell
npm start
```

### Run with pm2

```shell
pm2 start ecosystem.config.cjs
```

### Run health-check

```shell
npm run http-server
```

### Run health-check with pm2

```shell
pm2 start httpserver-ecosystem.config.cjs
```

### Deploy commands

```shell
npm run deploy-commands
```

### Deploy commands & Run with vite-node (dev)

```shell
npm run deploy-commands:dev
npm start:dev
```

## References

- [discord.js](https://discord.js.org): Node.js module to interact with the Discord API.
- [vite-note](https://github.com/vitest-dev/vitest/tree/main/packages/vite-node): Vite as Node runtime.
- [TypeScript](https://www.typescriptlang.org): JavaScript with syntax for types.
- [RxJS](https://rxjs.dev): Reactive Extensions Library for JavaScript.
- [injection-js](https://github.com/mgechev/injection-js): Dependency injection library for JavaScript and TypeScript.
