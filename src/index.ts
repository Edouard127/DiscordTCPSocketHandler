import { Client, Partials } from 'discord.js'
import { GatewayIntentBits } from 'discord-api-types/v10'
import events from './handlers/events';
import "colors"
import {registerSlash} from "./handlers/slash";
import {ProcessEnv} from "./interfaces/IProcessEnv";

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
if (process.env.BOT_ID == undefined) throw new Error("BOT_ID is required")

client.login(process.env.TOKEN)
client.once("ready", () => {
	console.log('[Discord API]'.green + ` Logged in as ${client.user?.tag}.`);
	events(client);
	const env = {
		TOKEN: process.env.TOKEN,
		BOT_ID: process.env.BOT_ID
	} as ProcessEnv;
	registerSlash(client, env);
})


if (!Map.prototype.getOrNull) {
	Map.prototype.getOrNull = function (s) {
		return this.get(s) ?? null;
	};
}
if (!Map.prototype.getAnyOrNull) {
	Map.prototype.getAnyOrNull = function (s: any) {
		for (const [k, v] of this.Iterate()) {
			if (k.includes(s)) return v;
		}
	};
}
if (!Map.prototype.Iterate) {
	Map.prototype.Iterate = function* () {
		for (const [k, v] of this) {
			yield [k, v];
		}
	};
}
if (!Map.prototype.map) {
	Map.prototype.map = function (fn) {
		const arr = [];
		for (const [k, v] of this.Iterate()) {
			arr.push(fn(v, k, this));
		}
		return arr;
	};
}
if (!Set.prototype.getOrNull) {
	Set.prototype.getOrNull = function (i) {
		return this.entries().next().value[i] ?? null;
	};
}
if (!Array.prototype.getOrNull) {
	Array.prototype.getOrNull = function (i) {
		return this[i] ?? null;
	};
}
if (!Array.prototype.getOr) {
	Array.prototype.getOr = function (i, def) {
		return this[i] ?? def;
	};
}
if (!Array.prototype.removeNull) {
	Array.prototype.removeNull = function () {
		return this.filter((v) => v != null);
	};
}
if (!Array.prototype.removeAt) {
	Array.prototype.removeAt = function (i) {
		return this.splice(i, 1);
	};
}
