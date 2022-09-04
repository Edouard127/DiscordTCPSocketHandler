import {PermissionResolvable} from "discord.js";

export interface CommandOptions {
    name: string;
    description: string;
    type: CommandOptionType;
    required?: boolean;
}
export interface CommandData {
    name: string;
    description: string;
    options: CommandOptions[];
    type: CommandOptionType;
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