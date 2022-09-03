import { Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { commands } from '../../../slash'
import ms from 'ms'
import embed from "../../../utils/embed";
const Timeout = new Set()

export default async(client: Client, interaction: CommandInteraction) => {
    if (interaction.isChatInputCommand()) {
		if (!commands.has(interaction.commandName)) return;
		if (!interaction.guild) return;
		const command = commands.get(interaction.commandName)
		if(!command) return
		try {
			if (command.timeout) {
				if (Timeout.has(`${interaction.user.id}${command.name}`)) {
					const embed = new EmbedBuilder()
					.setTitle('You are in timeout!')
					.setDescription(`You need to wait **${ms(command.timeout, { long: true })}** to use command again`)
					.setColor('#ff0000')
					return interaction.reply({ embeds: [embed], ephemeral: true })
				}
			}
			if (command.permissions) {
				if (!interaction.memberPermissions?.has(command.permissions)) {
					return interaction.reply({ embeds: [embed.error(`:x: You don't have permission(s) to use this command`)], ephemeral: true })
				}
			}
			// if (command.devs) {
			// 	if (!config.ownersID.includes(interaction.user.id)) {
			// 		return interaction.reply({ content: ":x: Only devs can use this command", ephemeral: true });
			// 	}
			// }
			if (command.ownerOnly) {
				if (interaction.user.id !== interaction.guild.ownerId) {
					return interaction.reply({ content: "Only the owner of this server can use this command", ephemeral: true })
				}
			}
			command.run(interaction);
			Timeout.add(`${interaction.user.id}${command.name}`)
			setTimeout(() => {
				Timeout.delete(`${interaction.user.id}${command.name}`)
			}, command.timeout);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: ':x: There was an error while executing this command!', ephemeral: true });
		}
	}
} 