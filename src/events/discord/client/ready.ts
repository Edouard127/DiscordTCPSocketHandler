import { Client } from 'discord.js'
import 'colors'
import { registerSlash } from '../../../slash';

export default async(client: Client) => {
    console.log("[Client]".green, "Logged in as", client.user?.username)
    await registerSlash(client)
};