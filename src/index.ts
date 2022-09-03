import { Client, Partials } from 'discord.js'
import { GatewayIntentBits } from 'discord-api-types/v10'
import events from './handlers/events';
import "colors"

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

events(client)

client.login(process.env.TOKEN);
