import { CommandInteraction, PermissionResolvable } from 'discord.js';

interface Command {
  category?: string;
  usage?: string;
  ownerOnly?: boolean;
  devs?: boolean;
  permissions?: PermissionResolvable;
  name?: string;
  description?: string;
  timeout?: number;
  options: Option[];
  run: (interaction: CommandInteraction) => Promise<void>;
}

interface Option {
  name: string;
  description: string;
  type: string;
  options: Option[];
}

export default Command;