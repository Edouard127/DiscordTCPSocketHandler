import {CommandOptions, CommandOptionType} from "../interfaces/commands/Command";
import {IIndexer} from "../interfaces/IIndexer";

export default class AbstractCommandOptions implements IClonable, IIndexer {
    public name: string[] | undefined[];
    public description: string[] | undefined[];
    public type: (CommandOptionType | undefined)[];
    public options?: CommandOptions[] | undefined[];
    constructor(options: CommandOptions[]) {
        this.name = this.get("name", options)
        this.description = this.get("description", options);
        this.type = this.get("type", options);
        this.options = this.clone();
    }
    public toJSON(): CommandOptions[] {
        return <CommandOptions[]>Object.keys(this).map((key, index) => {
            return {
                ...this.name[index] && {name: this.name[index]},
                ...this.description[index] && {description: this.description[index]},
                ...this.type[index] && {type: this.type[index]},
                ...this.options?.[index] && {options: this.options[index]}
            }
        })
    }
    get<T, K extends keyof T>(key: K, options: T[]): T[K][] | undefined[] {
        return options.map(option => option[key]);
    }

    clone<T>(): T {
        return <T>JSON.parse(JSON.stringify(this));
    };
    ifDefined<T>(value: T[] | undefined, index: number): T | undefined {
        return value?.[index] ?? undefined;
    }
}