import {Client, Interaction, PermissionFlagsBits, PermissionResolvable} from "discord.js";
import {CommandData, CommandOptions, CommandOptionType} from "../interfaces/commands/Command";

export class SlashCommand {
	public name: string[];
	public description: string[];
	public options: CommandOptions[][];
	public filePath: string;
	public type: CommandOptionType;
	public timeout?: number;
	public defaultPermission: PermissionResolvable;
	public ownerOnly: boolean = false;
	public constructor(creator: CommandData[]) {
		this.name = creator.map((c) => c.name);
		this.description = creator.map((c) => c.description);
		this.options = creator.map((c) => c.options);
		this.filePath = <string>creator.map((c) => c.filePath)[0];
		this.type = creator.map((c) => c.type)[0];
		this.timeout = creator.map((c) => c.timeout)[0];
		this.defaultPermission = <PermissionResolvable>creator.map((c) => c.defaultPermission)[0];
		this.ownerOnly = <boolean>creator.map((c) => c.ownerOnly)[0];
	}
	public toJSON(): CommandData[] {
		return this.name.map((name, i) => {
			return {
				name: name,
				description: this.description[i],
				options: this.options[i],
				type: this.type,
				timeout: this.timeout,
				defaultPermission: this.defaultPermission,
				ownerOnly: this.ownerOnly,
			};
		});
	}
	public async run(ctx: Interaction) {
		throw new Error(`Command ${this.name} doesn't have a run method!`);
	}
}