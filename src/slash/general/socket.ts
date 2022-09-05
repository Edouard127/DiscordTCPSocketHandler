import {Command} from "../../classes/AbstractCommand";
import AbstractCommandOptions from "../../classes/AbstractCommandOptions";
import {CommandOptions, CommandOptionType} from "../../interfaces/commands/Command";
import {Context} from "../../interfaces/application/Context";
import {connectToSocket} from "../../utils/socketUtils";
import * as embed from "../../utils/embed";
import {Client, EmbedBuilder, Interaction} from "discord.js";
import Packet from "../../classes/Packet";

export default class SlashCommand extends Command {
    public client: Client
    public channelId: string = "";
    constructor(client: Client) {
        super({
                name: 'socket',
                description: "Connect to a socket",
                options: new AbstractCommandOptions([
                    {
                        name: 'connect',
                        description: "Create connection",
                        type: CommandOptionType.SubCommand,
                        options: [
                            {
                                name: 'host',
                                description: "The host to connect to",
                                type: CommandOptionType.String,
                                required: true
                            },
                            {
                                name: 'port',
                                description: "The port to connect to",
                                type: CommandOptionType.Integer,
                                required: true
                            }
                        ]
                    },
                ] as CommandOptions[]),
            });
        this.filePath = __filename;
        this.client = client;
    }
    async run(ctx: Context<Interaction>): Promise<any> {
        if (!ctx.isChatInputCommand() || !ctx.inGuild() || !ctx.isCommand()) return
        const host = ctx.options.getString("host", true);
        const port = ctx.options.getInteger("port", true);
        if (!host) return ctx.reply({ content: "You must provide a host", ephemeral: true });
        if (!port) return ctx.reply({ content: "You must provide a port", ephemeral: true });
        connectToSocket(this, host, port);
        this.channelId = ctx.channelId;
        return ctx.reply({ embeds: [embed.success(`Connected to ${host}:${port}`)] });
    }
    async on(args: Packet) {
        const channel = await this.client.channels.fetch(this.channelId);
        const humanReadable = args.humanize();
        const str = `\`\`\`\n${humanReadable}\`\`\``;
        if (channel?.isTextBased()) {
            const embedBuilder = new EmbedBuilder()
                .setTitle("Socket")
                .setDescription(str)
            channel.send({ embeds: [embedBuilder] });
        }
    }
}