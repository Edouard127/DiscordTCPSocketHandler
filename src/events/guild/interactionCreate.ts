import {EmbedBuilder} from "discord.js";
import { commands } from '../../slash'
import ms from 'ms'
import * as embed from "../../utils/embed";
import {Context} from "../../interfaces/application/Context";
const Timeout = new Set()

export default class {
  constructor(ctx: Context) {
	  if (ctx.isChatInputCommand()) {
		  const command = commands.getOrNull(ctx.commandName)
		  if(!command) return
		  if (!ctx.guild) return;
		  try {
			  if (command.timeout) {
				  if (Timeout.has(`${ctx.user.id}${command.name}`)) {
					  return ctx.reply({ embeds: [embed.error(`You need to wait **${ms(command.timeout, { long: true })}** to use command again`)], ephemeral: true })
				  }
			  }
			  if (command.defaultPermission) {
				  if (!ctx.memberPermissions?.has(command.defaultPermission)) {
					  return ctx.reply({ embeds: [embed.error(`:x: You don't have permission(s) to use this command`)], ephemeral: true })
				  }
			  }
			  if (command.ownerOnly) {
				  if (ctx.user.id !== ctx.guild.ownerId) {
					  return ctx.reply({ content: "Only the owner of this server can use this command", ephemeral: true })
				  }
			  }
			  command.run(ctx).then(() => {
				  if (command.timeout) {
					  Timeout.add(`${ctx.user.id}${command.name}`)
					  setTimeout(() => {
						  Timeout.delete(`${ctx.user.id}${command.name}`)
					  }, command.timeout)
				  }
			  });
		  } catch (error) {
			  console.error(error);
			  return ctx.reply({ content: ':x: There was an error while executing this command!', ephemeral: true });
		  }
	  }
  }
}

