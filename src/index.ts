import { Client, Partials } from 'discord.js'
import { GatewayIntentBits } from 'discord-api-types/v10'
import events from './handlers/events';
import "colors"
import {registerSlash} from "./slash";

const client = new Client(
	{
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMembers,
			GatewayIntentBits.GuildInvites,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.GuildVoiceStates,
			GatewayIntentBits.MessageContent
		], partials: [
			Partials.GuildMember,
			Partials.Channel,
			Partials.Message,
			Partials.User
		]
	});

if (process.env.TOKEN == undefined) throw new Error("TOKEN is required");

client.login(process.env.TOKEN)
client.once("ready", () => {
	console.log('[Discord API]'.green + ` Logged in as ${client.user?.tag}.`);
	events(client);
	registerSlash(client);
})


if (!Map.prototype.getOrNull) {
	Map.prototype.getOrNull = function (s) {
		return this.get(s) ?? null;
	};
}
if (!Map.prototype.Iterate) {
	Map.prototype.Iterate = function* () {
		for (const [k, v] of this) {
			yield [k, v];
		}
	};
}
if (!Set.prototype.getOrNull) {
	Set.prototype.getOrNull = function (i) {
		return this.entries().next().value[i] ?? null;
	};
}

