import {Command} from "../../classes/AbstractCommand";
import {CommandOptions, CommandOptionType} from "../../interfaces/commands/Command";
import {Context} from "../../interfaces/application/Context";
import {commands} from "../../handlers/slash";
import AbstractCommandOptions from "../../classes/AbstractCommandOptions";
import {Interaction} from "discord.js";

export default class SlashCommand extends Command {
    constructor() {
        super({
                name: 'mixin',
                description: "Inject code into a command",
                options: new AbstractCommandOptions([
                    {
                        name: 'command',
                        description: "The command to reload",
                        type: CommandOptionType.String,
                        required: true
                    },
                    {
                        name: 'inject',
                        description: "Injects into the command",
                        type: CommandOptionType.String,
                    }
                ] as CommandOptions[]),
            });
        this.filePath = __filename;
    }
    async run(ctx: Context<Interaction>): Promise<any> {
        if (!ctx.isChatInputCommand() || !ctx.inGuild() || !ctx.isCommand()) return
        const command = ctx.options.getString("command", true);
        const inject = ctx.options.getString("inject", false);
        if (!command)
            return ctx.reply({ content: "You must provide a command to reload", ephemeral: true });
        const cmd = commands.getOrNull(command);
        if (!cmd)
            return ctx.reply({ content: "That command does not exist", ephemeral: true });
        if (inject) {
            super.inject(cmd, inject);
        }
    }
}