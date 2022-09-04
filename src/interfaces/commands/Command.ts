import {PermissionResolvable} from "discord.js";
import AbstractCommandOptions from "../../classes/AbstractCommandOptions";

export interface CommandOptions {
    name: string;
    description: string;
    type: CommandOptionType;
    options: SubCommandOptions[];
}
export interface SubCommandOptions {
    name: string;
    description: string;
    type: CommandOptionType;
    required: boolean | undefined;
}
export interface CommandData {
    name: string;
    description: string;
    options?: AbstractCommandOptions | undefined;
    filePath?: string;
    timeout?: number;
    defaultPermission?: PermissionResolvable;
    ownerOnly?: boolean;
}
export enum CommandOptionType {
    SubCommand = 1,
    SubCommandGroup = 2,
    String = 3,
    Integer = 4,
    Boolean = 5,
    User = 6,
    Channel = 7,
    Role = 8,
    Mentionable = 9
}