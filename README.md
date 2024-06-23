# Efdehen Bot

All-purpose bot for the "Fleurs de Nantes" Discord server

## Getting Started

### Define your Token, Client ID and Guild ID

Create an .env file at the root of your project and define your Discord bot token, Client ID and Guild ID in a variable as following:
```shell
TOKEN="Your_token_here"
CLIENT_ID="Your_client_id_here"
GUILD_ID="Your_guild_id_here"
```

### Define your channels

The channel IDs are defined in src/infra/channels-static.json
```json
[
    {
        "key": "custom_key",
        "id": "channel_id"
    }
]
```

### Install dependencies

```shell
npm install
```

### Build

```shell
npm run build
```

### Deploy commands

```shell
npm run deploy-commands
```

### Run

```shell
npm start
```

### Run with pm2

```shell
pm2 start ecosystem.config.cjs
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
