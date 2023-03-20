import { IChannelConfig } from "./channelConfig.model";
import { IEmojiConfig } from "./emojiConfig.model";

export interface IClassicPollConfig {
    enabled: boolean;
    allChannels: boolean;
    subChannels: boolean;
    channels: IChannelConfig[];
    emojis: IEmojiConfig[];
    keywords: string[];
}
