import {Client, Guild, Interaction} from "discord.js";

export type Context = {
    client: Client<true>;
    guild: Guild;
} & Interaction;