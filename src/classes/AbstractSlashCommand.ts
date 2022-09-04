import {Client, Interaction, PermissionFlagsBits, PermissionResolvable} from "discord.js";
import {CommandData, CommandOptions, CommandOptionType} from "../interfaces/commands/Command";

export class SlashCommand {
	public name: string;
	public description: string;
	public options: CommandOptions[];
	public filePath: string;
	public type: CommandOptionType;
	public timeout?: number;
	public defaultPermission: PermissionResolvable;
	public ownerOnly: boolean = false;
	public constructor(creator: CommandData) {
		this.name = creator.name;
		this.description = creator.description;
		this.options = creator.options;
		this.type = creator.type;
		this.filePath = creator.filePath ?? '';
		this.timeout = creator.timeout ?? 0;
		this.defaultPermission = creator.defaultPermission ?? PermissionFlagsBits.UseApplicationCommands;
	}
	public toJSON(): CommandData {
		return {
			name: this.name,
			description: this.description,
			options: this.options,
			type: this.type,
			filePath: this.filePath
		};
	}
	public async run(ctx: Interaction) {
		throw new Error(`Command ${this.name} doesn't have a run method!`);
	}
}