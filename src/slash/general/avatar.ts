import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Client,
	EmbedBuilder,
	GuildMember,
	Interaction,
	MessageActionRowComponentBuilder
} from 'discord.js'
import * as embed from "../../utils/embed"
import {CommandOptionType} from "../../interfaces/commands/Command";
import {SlashCommand} from "../../classes/AbstractSlashCommand";
import {Context} from "../../interfaces/application/Context";

export default class Command extends SlashCommand {
	constructor() {
		super([
			{
				name: 'avatar',
				description: "Get an avatar",
				type: CommandOptionType.SubCommand,
				options: [
					{
						name: "user",
						description: "The user to get the avatar from",
						type: CommandOptionType.User,
						required: false
					},
				]
			},
			{
				name: 'server',
				description: "Get the server's icon",
				type: CommandOptionType.SubCommand,
				options: []
			}]);
		this.filePath = __filename;
	}

	async run(ctx: Context): Promise<any> {
		console.log(ctx)
		if (!ctx.isChatInputCommand() || !ctx.inGuild() || !ctx.isCommand()) return
		switch (ctx.options.getSubcommand()) {
			case "user": {
				const user = ctx.options.getUser("user", true);
				let icon = user.displayAvatarURL({ size: 4096 })
				if (!icon) return ctx.reply({ content: "This user has no avatar", ephemeral: true })
				const embedBuilder = new EmbedBuilder()
					.setTitle(`${user.tag}'s Avatar`)
					.setImage(user.displayAvatarURL({ size: 4096 }))
					.setFooter({ text: `Requested By ${ctx.user.tag}`, iconURL: ctx.user.displayAvatarURL({ size: 4096 }) });
				let row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
					new ButtonBuilder()
						.setStyle(ButtonStyle.Link)
						.setURL(icon)
						.setLabel('Image'),
				);
				return ctx.reply({ embeds: [embedBuilder], components: [row] });
			}
			case "server": {
				let icon = ctx.guild.iconURL({ size: 4096 })
				if (!icon) return ctx.reply({ content: "This server has no icon", ephemeral: true })
				const embedBuilder = new EmbedBuilder()
					.setTitle(`${ctx.guild.name}'s Avatar`)
					.setImage(ctx.guild.iconURL({ size: 4096 }))
					.setFooter({ text: `Requested By ${ctx.user.tag}`, iconURL: ctx.user.displayAvatarURL({ size: 4096 }) });
				let row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
					new ButtonBuilder()
						.setStyle(ButtonStyle.Link)
						.setURL(icon)
						.setLabel('Image'),
				);
				return ctx.reply({ embeds: [embedBuilder], components: [row] });
			}
		}
	}
}


