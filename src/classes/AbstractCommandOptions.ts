import {CommandOptions, CommandOptionType, SubCommandOptions} from "../interfaces/commands/Command";
import {IIndexer} from "../interfaces/IIndexer";

export default class AbstractCommandOptions implements IClonable, IIndexer {
    public name: string[];
    public description: string[];
    public type: CommandOptionType[];
    public options: SubCommandOptions[][]
    constructor(options: CommandOptions[]) {
        this.name = this.get("name", options);
        this.description = this.get("description", options)
        this.type = this.get("type", options);
        this.options = this.get("options", options);
    }
    public toJSON() {
        return this.name.map((name, index) => {
            return {
                name,
                description: this.description[index],
                type: this.type[index],
                options: this.options[index]
            }
        })
    }
    get<T, K extends keyof T>(key: K, options: T[]): T[K][] {
        return options.map((option) => option[key])
    }
    get [Symbol.toStringTag](): string {
        return "AbstractCommandOptions";
    }
    clone<T>(s: any): this {
        return <this>Object.assign(new s.constructor(), s);
    }
}