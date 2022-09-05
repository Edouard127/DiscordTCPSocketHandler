import {Client, Guild} from "discord.js";

export type Context<T> = {
    client: Client<true>;
    guild: Guild;
} & T;