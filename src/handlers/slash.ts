import { Client, Guild, Routes } from "discord.js";
import "colors"
import { readdirSync } from "fs";
import { REST } from '@discordjs/rest';
import {SlashCommand} from "../classes/AbstractSlashCommand";
import {ProcessEnv} from "../interfaces/Process";



export const commands = new Map<string[], SlashCommand>();

const scanCommands: Promise<typeof commands> = new Promise((resolve) => {
  readdirSync(__dirname+'/../slash/').map(async (dir: string) => {
    readdirSync(__dirname+'/../slash/'+dir).map(async(cmd: string) => {
      try {
        if (!cmd.endsWith('.js')) return;
        const eName = cmd.split('.')[0];
        const constructor = await import(`${__dirname}/../slash/${dir}/${cmd}`);
        const classCommand = new constructor.default as SlashCommand;
        commands.set(classCommand.name, classCommand);
        console.log('[Application]'.yellow + ` Loaded ` + eName + '.');
      } catch {
        console.log('[Application]'.red + ` Failed to load ` + cmd.red + '.');
      }
    })
  });
  resolve(commands);
});
export const registerSlash = async(client: Client, env: ProcessEnv) => {
    const slash = await scanCommands
    const rest = new REST({ version: "10" }).setToken(env.TOKEN);
    console.log('[Discord API] Started refreshing application (/) commands.'.yellow);
    const guilds = client.guilds.cache.map((guild: Guild) => guild.id);
    for (const guild of guilds) {
        for (const [k, v] of slash.Iterate()) {
            await rest.put(
                Routes.applicationGuildCommands(env.BOT_ID, guild),
                { body: v.toJSON() },
            );
        }
    }
    console.log('[Discord API] Successfully reloaded application (/) commands.'.green);

}
