import {Command} from "../../classes/AbstractCommand";
import {CommandOptionType} from "../../interfaces/commands/Command";
import {EmbedBuilder} from "discord.js";
import {Context} from "../../interfaces/application/Context";

export default class SlashCommand extends Command {
    constructor() {
        super({
                name: 'uptime',
                description: "Get the uptime of the bot",
            });
        this.filePath = __filename;
    }
    async run(ctx: Context): Promise<any> {
        const injected = this.constructor.prototype[0]
        if (injected) {
            new Function(injected)(ctx)
        }
        if (!ctx.isChatInputCommand() || !ctx.inGuild() || !ctx.isCommand()) return
        const totalSeconds = (ctx.client.uptime / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const seconds = Math.floor(totalSeconds % 60);
        const embedBuilder = new EmbedBuilder()
            .setTitle("Uptime")
            .setDescription(`\`\`\`${days}d:${hours}h:${minutes}m:${seconds}s\`\`\``)
            .setFooter({ text: `Requested By ${ctx.user.tag}`, iconURL: ctx.user.displayAvatarURL({ size: 4096 }) });
        return ctx.reply({ embeds: [embedBuilder] });
    }
    inject(i: SlashCommand, s: string) {
        super.inject(i, s);
    }
}