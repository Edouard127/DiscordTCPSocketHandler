import {Client, Interaction, PermissionFlagsBits, PermissionResolvable} from "discord.js";
import {CommandData, CommandOptions, CommandOptionType} from "../interfaces/commands/Command";
import AbstractCommandOptions from "./AbstractCommandOptions";

export class Command {
	public name: string;
	public description: string;
	public options: AbstractCommandOptions | undefined;
	public filePath: string;
	public timeout?: number;
	public defaultPermission: PermissionResolvable;
	public ownerOnly: boolean
	public constructor(creator: CommandData) {
		this.name = creator.name;
		this.description = creator.description;
		this.options = creator.options;
		this.filePath = <string>creator.filePath;
		this.timeout = creator.timeout;
		this.defaultPermission = <PermissionResolvable>creator.defaultPermission;
		this.ownerOnly = <boolean>creator.ownerOnly;
	}
	public toJSON() {
		return {
			name: this.name,
			description: this.description,
			...this.options && {options: this.options.toJSON()},
			filePath: this.filePath,
			...this.timeout && {timeout: this.timeout},
			...this.defaultPermission && {defaultPermission: this.defaultPermission},
			...this.ownerOnly && {ownerOnly: this.ownerOnly}
		}
	}
	public async run(ctx: Interaction) {
		throw new Error(`Command ${this.name} doesn't have a run method!`);
	}
	public async hotReload() {
		throw new Error(`Command ${this.name} doesn't have a hotReload method!`);
	}
}