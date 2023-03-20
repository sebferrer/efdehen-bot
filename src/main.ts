import { AppModule } from './app.module';
import moment from 'moment-mini';
import * as dotenv from 'dotenv';
import { DiscordClient } from './infra/discord/discordClient';
import { CommandsRegisterer } from './commands/registerer/commandsRegisterer';
import { ACommand } from './commands/handlers/command';
import { CommandInteraction, Events, Interaction, Message } from 'discord.js';
import { PollService } from './infra/discord/poll.service';

dotenv.config();

/**
 * Warning:
 * The "noUnusedLocals" parameter in tsconfig is set to "false" in order for the commented examples to work if you uncomment them.
 * It's strongly recommended to set it to "true" if you use this template as a base for your project.
 */

const injector = AppModule.getInjector();

const discordClient = injector.get(DiscordClient);
const commandsRegisterer = injector.get(CommandsRegisterer);
const pollService = injector.get(PollService);

discordClient.once(Events.ClientReady, () => {
    console.log(`Logged in as ${discordClient.user.tag} - ${moment().toISOString()}`);

    // Add all commands to the client
    /*commandsRegisterer.commands.forEach(
        (command: ACommand) => discordClient.commands.set(command.name, command)
    );*/
});

discordClient.on(Events.InteractionCreate, async (interaction: Interaction) => {
    const commandInteraction = interaction as CommandInteraction;
    const command = interaction.client.commands.get(commandInteraction.commandName);
    if (!command) {
        console.error(`No command matching ${commandInteraction.commandName} was found.`);
        return;
    }

    try {
        command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        commandInteraction.reply({ content: 'There was an error while executing this command!', ephemeral: true }).then(() => { });
    }
});

discordClient.on(Events.MessageCreate, (message: Message) => {
    pollService.handleClassicPolls(message);
    pollService.handleNumberedPolls(message);
})

// Your Discord bot token here
discordClient.login(process.env.TOKEN);
