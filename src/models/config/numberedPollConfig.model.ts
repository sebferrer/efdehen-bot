import { IChannelConfig } from "./channelConfig.model";

export interface INumberedPollConfig {
    enabled: boolean;
    allChannels: boolean;
    subChannels: boolean;
    channels: IChannelConfig[];
}
