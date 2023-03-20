import { IClassicPollConfig } from "./classicPollConfig.model";
import { INumberedPollConfig } from "./numberedPollConfig.model";

export interface IPollsConfig {
    classic: IClassicPollConfig;
    numbered: INumberedPollConfig;
}
