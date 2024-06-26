import 'reflect-metadata';
import { Provider, ReflectiveInjector } from "injection-js";
import { ChannelsService } from "./infra/channels.service";
import { CronsService } from "./infra/crons.service";
import { DiscordClient } from "./infra/discord/discordClient";
import { TextChannelService } from "./infra/discord/textChannel.service";
import { PollService } from './infra/discord/poll.service';

export class AppModule {
    private static injector: ReflectiveInjector;
    private static providers: Provider[] = [
        DiscordClient,
        TextChannelService,
        ChannelsService,
        CronsService,
        PollService
    ]

    private constructor() { }

    public static getInjector(): ReflectiveInjector {
        if (!AppModule.injector) {
            AppModule.injector = ReflectiveInjector.resolveAndCreate(this.providers);
        }

        return AppModule.injector;
    }
}
