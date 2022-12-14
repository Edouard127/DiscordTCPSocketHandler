import {Flags} from "../enums/Flags";
import {Packets} from "../enums/Packets";
import {ParseArgs} from "../utils/ParseArgs";

export default class Packet {
    public length: number;
    public fragmented: boolean;
    public byte: Packets;
    public flag: Flags;
    public args: string[][];

    constructor(length: number, fragmented: boolean, byte: Packets, flag: Flags, args: string[][]) {
        this.length = length;
        this.fragmented = fragmented;
        this.byte = byte;
        this.flag = flag;
        this.args = args;
    }

    public Args(): string[] {
        return this.args.flat();
    }

    public static getFlag(flag: string): Flags {
        return parseInt(Flags[parseInt(flag)]);
    }

    public static fromBuffer(buffer: Buffer): Packet | null {
        if (buffer.toString() === "\n") return null
        const args = buffer.toString().split(" ");
        return new Packet(parseInt(args[0]), Boolean(args[1]), parseInt(args[2]), this.getFlag(args[3]), args.slice(4).map((arg) => arg.split(":")));
    }

    public humanize(): string {
        return ParseArgs(this.Args());
    }
}
