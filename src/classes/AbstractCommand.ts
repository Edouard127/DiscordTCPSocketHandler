import {Interaction, PermissionResolvable} from "discord.js";
import {CommandData} from "../interfaces/commands/Command";
import AbstractCommandOptions from "./AbstractCommandOptions";
import AbstractInject from "./AbstractInject";
import {commands} from "../handlers/slash";
import Packet from "./Packet";
import AbstractCancallableEvent from "./AbstractCancallableEvent";

export class Command implements AbstractInject, AbstractCancallableEvent {
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

	inject(i: any, s: string) {
		const instance = commands.getOrNull(i.name)
		if (!instance) throw new Error(`Command ${i} does not exist!`)
		instance.constructor.prototype[0] = s
		commands.set(i, instance)
	}

	sendEvent(args: any): void {
		this.on(args)
	}

	cancel() {
		this.sendEvent(null)
	}

	on(args: any): void {
		throw new Error(`Command ${this.name} doesn't have an on method!`);
	}
}

