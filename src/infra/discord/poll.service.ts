import { Inject, Injectable, Injector } from "injection-js";
import { Message } from "discord.js";
import { INumberedPoll } from "src/models/numberedPoll.model";
import * as CONFING_JSON from '../../config.json';
import { DiscordClient } from "./discordClient";
import { IClassicPollConfig } from "src/models/classicPollConfig.model";
import { INumberedPollConfig } from "src/models/numberedPollConfig.model";

const NUMBERS_REACTS_MAP = new Map([
    [1, "1️⃣"],
    [2, "2️⃣"],
    [3, "3️⃣"],
    [4, "4️⃣"],
    [5, "5️⃣"],
    [6, "6️⃣"],
    [7, "7️⃣"],
    [8, "8️⃣"],
    [9, "9️⃣"],
]);

const CONFIG: any = (CONFING_JSON as any).default;

@Injectable()
export class PollService {
    private discordClient: DiscordClient;
    private classicPollConfig: IClassicPollConfig;
    private numberedPollConfig: INumberedPollConfig;

    constructor(
        @Inject(Injector) private injector: Injector
    ) {
        this.discordClient = this.injector.get<DiscordClient>(DiscordClient);

        const classicPollsConfig = CONFIG.polls.classic;
        this.classicPollConfig = {
            enabled: classicPollsConfig.enabled,
            allChannels: classicPollsConfig.allChannels,
            channels: classicPollsConfig.channels.map((channel: any) => channel.id),
            emojis: classicPollsConfig.emojis,
            keywords: classicPollsConfig.keywords
        }

        const numberedPollsConfig = CONFIG.polls.numbered;
        this.numberedPollConfig = {
            enabled: numberedPollsConfig.enabled,
            allChannels: numberedPollsConfig.allChannels,
            channels: numberedPollsConfig.channels.map((channel: any) => channel.id)
        }
    }

    public handleClassicPolls(message: Message) {
        if (!this.classicPollConfig.enabled) {
            return;
        }
        if (this.classicPollConfig.allChannels ||
            this.classicPollConfig.channels.includes(message.channelId) && this.classicPollConfig.keywords.some(v => message.content.includes(v))) {
            try {
                for (let i = 0; i < this.classicPollConfig.emojis.length; i++) {
                    const emojiConfig = this.classicPollConfig.emojis[i];
                    if (emojiConfig.standard) {
                        message.react(emojiConfig.id);
                    } else {
                        message.react(this.discordClient.emojis.cache.find((emoji: any) => emoji.name === emojiConfig.id));
                    }
                }
            } catch (error) {
                console.error('One of the emojis failed to react:', error);
            }
        }
    }

    public handleNumberedPolls(message: Message) {
        if (!this.numberedPollConfig.enabled) {
            return;
        }
        if (this.numberedPollConfig.allChannels || this.numberedPollConfig.channels.includes(message.channelId)) {
            let numberedPoll = this.getFirstNumberedPoll(message.content);
            if (numberedPoll == null) {
                return;
            }
            try {
                for (let i = numberedPoll.x; i < numberedPoll.y + 1; i++) {
                    message.react(NUMBERS_REACTS_MAP.get(i));
                }
            } catch (error) {
                console.error('One of the emojis failed to react:', error);
            }
        }
    }

    private getFirstNumberedPoll(str: string): INumberedPoll {
        const pattern = /\b([1-9])\-([2-9])\b/g;

        let match: RegExpExecArray | null;
        while ((match = pattern.exec(str)) !== null) {
            const x = parseInt(match[1], 10);
            const y = parseInt(match[2], 10);
            if (x < y) {
                return { x, y };
            }
        }

        return null;
    }
}
