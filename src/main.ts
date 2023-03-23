import { AppModule } from './app.module';
import moment from 'moment-mini';
import * as dotenv from 'dotenv';
import { DiscordClient } from './infra/discord/discordClient';
import { Events, Message } from 'discord.js';
import { PollService } from './infra/discord/poll.service';

dotenv.config();

const injector = AppModule.getInjector();

const discordClient = injector.get(DiscordClient);
const pollService = injector.get(PollService);

discordClient.once(Events.ClientReady, () => {
    console.log(`Logged in as ${discordClient.user.tag} - ${moment().toISOString()}`);
});

discordClient.on(Events.MessageCreate, (message: Message) => {
    pollService.handleClassicPolls(message);
    pollService.handleNumberedPolls(message);
})

discordClient.login(process.env.EFDEHEN_TOKEN);
