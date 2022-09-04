import {Client, Guild, Interaction} from "discord.js";

export type Context = Omit<Client, "client"> & {
    client: Client<true>;
    guild: Guild;
} & Interaction;