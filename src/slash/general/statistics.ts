import {Command} from "../../classes/AbstractCommand";
import {Context} from "../../interfaces/application/Context";
import {EmbedBuilder, Interaction, version} from "discord.js";
import {commands} from "../../handlers/slash";
import os from "os"

export default class SlashCommand extends Command {
    constructor() {
        super({
            name: 'statistics',
            description: "Get the statistics of the bot",
        });
        this.filePath = __filename;
    }
    async run(ctx: Context<Interaction>): Promise<any> {
        if (!ctx.isChatInputCommand() || !ctx.inGuild() || !ctx.isCommand()) return
        const embedBuilder = new EmbedBuilder()
            .setTitle("Statistics")
            .addFields([
                {
                    name: "Guilds",
                    value: `\`\`\`${ctx.client.guilds.cache.size}\`\`\``,
                },
                {
                    name: "Users",
                    value: `\`\`\`${ctx.client.users.cache.size}\`\`\``,
                },
                {
                    name: "System",
                    value: `\`\`\`Platform: ${os.platform()}\`\`\``
                },
                {
                    name: "Node",
                    value: `\`\`\`Version: ${process.version}\`\`\``
                },
                {
                    name: "Discord.js",
                    value: `\`\`\`Version: ${version}\`\`\``
                },
                {
                    name: "Uptime",
                    value: `\`\`\`${Math.round(process.uptime() / 86400)}d:${Math.round(process.uptime() / 3600) % 24}h:${Math.round(process.uptime() / 60) % 60}m:${Math.round(process.uptime() % 60)}s\n\`\`\``
                },
                {
                    name: "Ping",
                    value: `\`\`\`${Math.round(ctx.client.ws.ping)}ms\`\`\``
                },
                {
                    name: "Load",
                    value: `\`\`\`1m: ${Math.round(os.loadavg()[0] * 100) / 100}%\n5m: ${Math.round(os.loadavg()[1] * 100) / 100}%\n15m: ${Math.round(os.loadavg()[2] * 100) / 100}%\`\`\``
                },
                {
                    name: "CPUs",
                    value: `\`\`\`Model: ${os.cpus()[0].model}\nCores: ${os.cpus().length}\`\`\``
                },
                {
                    name: "Memory",
                    value: `\`\`\`Total: ${Math.round(os.totalmem() / 1024 / 1024)}MB\nUsed: ${Math.round((os.totalmem() - os.freemem()) / 1024 / 1024)}MB\nFree: ${Math.round(os.freemem() / 1024 / 1024)}MB\`\`\``
                },
            ])
            .setFooter({ text: `Requested By ${ctx.user.tag}`, iconURL: ctx.user.displayAvatarURL({ size: 4096 }) });
        return ctx.reply({ embeds: [embedBuilder] });
    }
}