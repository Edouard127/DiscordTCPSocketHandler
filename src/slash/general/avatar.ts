import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Interaction, GuildMember, ButtonStyle, ActionRow, ActionRowData } from 'discord.js'
import options from '../../etc/options/general/avatar/options'
import embed_ from "../../utils/embed"

module.exports = {
	options,
	name: 'avatar',
	description: "Get an avatar",
	description_localizations: {
		"en-US": "Get an avatar",
		"fr": "Obtener un avatar",
		"es-ES": "Conseguir un avatar",
		"ru": "Получить аватар"
	},
	category: 'general',
	run: async (interaction: Interaction) => {
		if (!interaction.isChatInputCommand() || !interaction.inGuild() || !interaction.guild) return
		const member = await interaction.options.getUser("user")
		const commands = interaction.options.getSubcommand()
		switch (commands) {
			case "server": {
				let icon = interaction.guild.iconURL({ size: 4096 })
				if(!icon) return interaction.reply({ embeds: [embed_.error("This server does not have an icon")] })

				const embed = new EmbedBuilder()
					.setAuthor({ name: interaction.guild!.name, iconURL: interaction.guild?.iconURL({ size: 4096 }) ?? "https://cdn.discordapp.com/embed/avatars/0.png" })
					.setDescription(`[Icon Link](${icon})`)
					.setImage(icon)
					.setFooter({ text: `Requested By ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) });
				const row = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setStyle(ButtonStyle.Link)
						.setURL(icon as string)
						.setLabel('Server Icon'),
				);
				return interaction.reply({ embeds: [embed], components: [row as any] });
			}
			case "user": {
				let icon = member?.avatarURL({ size: 4096 })
				if(!icon) return interaction.reply({ embeds: [embed_.error("This member does not have an avatar")] })
				const embed = new EmbedBuilder()
					.setAuthor({ name: member?.tag ?? "Unknown", iconURL: member?.avatarURL({ size: 4096 }) ?? "https://cdn.discordapp.com/embed/avatars/0.png"  })
					.setDescription(`[Icon Link](${icon})`)
					.setImage(icon as string)
					.setFooter({ text: `Requested By ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) });
				const row = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setStyle(ButtonStyle.Link)
						.setURL(icon as string)
						.setLabel('User Avatar'),
				);
				return interaction.reply({ embeds: [embed], components: [row as any] });
			}
		}
	},
};
