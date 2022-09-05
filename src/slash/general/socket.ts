import {Command} from "../../classes/AbstractCommand";
import AbstractCommandOptions from "../../classes/AbstractCommandOptions";
import {CommandOptions, CommandOptionType} from "../../interfaces/commands/Command";
import {Context} from "../../interfaces/application/Context";
import {commands} from "../../handlers/slash";
import {connectToSocket} from "../../utils/socketUtils";
import {EventEmitter} from "node:events";

export default class SlashCommand extends Command {
    constructor() {
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
    }
    async run(ctx: Context): Promise<any> {
        if (!ctx.isChatInputCommand() || !ctx.inGuild() || !ctx.isCommand()) return
        const host = ctx.options.getString("host", true);
        const port = ctx.options.getInteger("port", true);
        if (!host) return ctx.reply({ content: "You must provide a host", ephemeral: true });
        if (!port) return ctx.reply({ content: "You must provide a port", ephemeral: true });
        connectToSocket(this, host, port);
    }
    async on(args: string[]) {
        console.log(args);
    }
}