import { Client, Collection, Guild, Routes } from "discord.js";
import Command from "./types/Commands/Command";
import "colors"
import { readdirSync } from "fs";
import { REST } from '@discordjs/rest';

const commands = new Collection<string, Command>();

const scanCommands: Promise<Collection<string, Command>> = new Promise((resolve) => {
  readdirSync('./slash/').map(async (dir: string) => {
    readdirSync(`./slash/${dir}`).map(async(cmd: string) => {
      try {
        if (!cmd.endsWith('.js')) return;
        const pull = await import(`${__dirname}/slash/${dir}/${cmd}`);
        console.log('[Application]'.yellow + ` Loaded ` + pull.default.name.green + '.');
        commands.set(pull.default.name, pull.default);
      } catch {}
    })
  });
  resolve(commands);
});
const registerSlash = async(client: Client) => {
  if (process.env.TOKEN == undefined) throw new Error("TOKEN is required");
  if (process.env.BOT_ID == undefined) throw new Error("BOT_ID is required")
  const slash = await scanCommands
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  console.log('[Discord API] Started refreshing application (/) commands.'.yellow);
  client.guilds.cache.forEach(async(guild: Guild) => await rest.put(Routes.applicationGuildCommands(process.env.BOT_ID as string, guild.id), { body: slash }).catch(e => e))
  console.log('[Discord API] Successfully reloaded application (/) commands.'.green);

}
export {
  commands, registerSlash
}
