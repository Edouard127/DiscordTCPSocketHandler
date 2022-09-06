import {Command} from "../../classes/AbstractCommand";
import AbstractCommandOptions from "../../classes/AbstractCommandOptions";
import {CommandOptions, CommandOptionType} from "../../interfaces/commands/Command";
import {Context} from "../../interfaces/application/Context";
import {connectToSocket} from "../../utils/socketUtils";
import * as embed from "../../utils/embed";
import {Client, EmbedBuilder, Interaction} from "discord.js";
import Packet from "../../classes/Packet";
import {Socket} from "net";

export default class SlashCommand extends Command {
    public client: Client
    public channelId: string = "";
    private socket: Socket = new Socket();
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
                    {
                        name: 'send',
                        description: "Send data to the socket",
                        type: CommandOptionType.SubCommand,
                        options: [
                            {
                                name: 'data',
                                description: "The data to send",
                                type: CommandOptionType.String,
                                required: true
                            }
                        ]
                    }
                ] as CommandOptions[]),
            });
        this.filePath = __filename;
        this.client = client;
    }
    async run(ctx: Context<Interaction>): Promise<any> {
        if (!ctx.isChatInputCommand() || !ctx.inGuild() || !ctx.isCommand()) return
        switch (ctx.options.getSubcommand()) {
            case "connect": {
                const host = ctx.options.getString("host", true);
                const port = ctx.options.getInteger("port", true);
                if (!host) return ctx.reply({ content: "You must provide a host", ephemeral: true });
                if (!port) return ctx.reply({ content: "You must provide a port", ephemeral: true });
                this.channelId = ctx.channelId;
                try {
                    await connectToSocket(this.socket, this, host, port);
                } catch (e) {
                    return ctx.reply({ content: "Failed to connect", ephemeral: true });
                }
                return ctx.reply({ embeds: [embed.success(`Connected to ${host}:${port}`)] });
            }
            case "send": {
                if (!this.channelId) return ctx.reply({ content: "You must connect to a socket first", ephemeral: true });
                const data = ctx.options.getString("data", true);
                if (!data) return ctx.reply({ content: "You must provide data to send", ephemeral: true });
                try {
                    this.socket.write(data);
                } catch (e) {
                    return ctx.reply({ content: "Failed to send data", ephemeral: true });
                }
                return ctx.reply({ embeds: [embed.success(`Sent data to socket`)] });
            }
        }
    }
    async on(args: any | null) {
        const channel = await this.client.channels.fetch(this.channelId);
        if (!channel) return;
        if (channel.isTextBased()) {
            if (!(args instanceof Packet)) return channel.send({ embeds: [embed.error("Socket closed")] });
            const humanReadable = args.humanize();
            const str = `\`\`\`\n${humanReadable}\`\`\``;
            const embedBuilder = new EmbedBuilder()
                .setTitle("Socket")
                .setDescription(str)
            channel.send({ embeds: [embedBuilder] });
        }
    }
}