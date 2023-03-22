import { Inject, Injectable, Injector } from "injection-js";
import { Message, TextChannel } from "discord.js";
import { INumberedPoll } from "src/models/numberedPoll.model";
import * as CONFING_JSON from '../../config.json';
import { DiscordClient } from "./discordClient";
import { IConfig } from "src/models/config/config.model";
import { IChannel, IChannelConfig } from "src/models";

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

const CONFIG: IConfig = (CONFING_JSON as any).default;
const CLASSIC_POLL_CONFIG = CONFIG.polls.classic;
const NUMBERED_POLL_CONFIG = CONFIG.polls.numbered;

@Injectable()
export class PollService {
    private discordClient: DiscordClient;

    constructor(
        @Inject(Injector) private injector: Injector
    ) {
        this.discordClient = this.injector.get<DiscordClient>(DiscordClient);
    }

    public handleClassicPolls(message: Message) {
        if (!CLASSIC_POLL_CONFIG.enabled) {
            return;
        }
        const allowedChannels = CLASSIC_POLL_CONFIG.channels.map((channel: IChannelConfig) => channel.id);
        const channel = message.channel as TextChannel;
        if (CLASSIC_POLL_CONFIG.allChannels ||
            (
                allowedChannels.includes(message.channelId) ||
                CLASSIC_POLL_CONFIG.subChannels && allowedChannels.includes(channel.parentId)
            ) &&
            CLASSIC_POLL_CONFIG.keywords.some((v: string) => message.content.includes(v))) {
            try {
                for (let i = 0; i < CLASSIC_POLL_CONFIG.emojis.length; i++) {
                    const emojiConfig = CLASSIC_POLL_CONFIG.emojis[i];
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
        if (!NUMBERED_POLL_CONFIG.enabled) {
            return;
        }
        const allowedChannels = NUMBERED_POLL_CONFIG.channels.map((channel: IChannelConfig) => channel.id);
        const channel = message.channel as TextChannel;
        if (NUMBERED_POLL_CONFIG.allChannels ||
            (
                allowedChannels.includes(message.channelId) ||
                NUMBERED_POLL_CONFIG.subChannels && allowedChannels.includes(channel.parentId)
            )) {
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
