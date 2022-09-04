import {EmbedBuilder, ColorResolvable, Colors} from 'discord.js';

export const error = (description: string) => {
	  return new EmbedBuilder()
	.setTitle('Error')
	.setDescription(description)
	.setColor(Colors.Red)
	.toJSON();
}
export const success = (description: string) => {
	  return new EmbedBuilder()
	.setTitle('Success')
	.setDescription(description)
	.setColor(Colors.Green)
	.toJSON();
}
