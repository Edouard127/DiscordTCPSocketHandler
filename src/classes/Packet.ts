import {Flags} from "../interfaces/Flags";
import {Packets} from "../interfaces/Packets";

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
        return this.args.slice(4).flat();
    }

    private humanizeArgs(): Map<string, string> {
        switch (this.byte) {
            case Packets.EXIT:
                return new Map<string, string>([
                    ["The server is shutting down.", ""]
                ]);
            case Packets.OK:
                return new Map<string, string>([
                    ["The server responsed with OK", ""]
                ]);
            case Packets.HEARTBEAT:
                return new Map<string, string>([
                    ["The server is sending a heartbeat", ""]
                ]);
            case Packets.LOGIN:
                return new Map<string, string>([
                    ["The worker attempted to connect at:", this.Args().join(" ")]
                ]);
            case Packets.LOGOUT:
                return new Map<string, string>([
                    ["The worker disconnect from Its server", ""]
                ]);
            case Packets.ADD_WORKER:
                return new Map<string, string>([
                    ["A new worker has been added", ""]
                ]);
            case Packets.REMOVE_WORKER:
                return new Map<string, string>([
                    ["A worker has been removed", ""]
                ]);
            case Packets.INFORMATION:
                return new Map<string, string>([
                    ["The server is sending player information:", this.Args().join(" ")],
                ]);
            case Packets.JOB:
                return new Map<string, string>([
                    ["The worker has sent a job packet", this.Args().join(" ")],
                ]);
            case Packets.CHAT:
                return new Map<string, string>([
                    ["The worker has sent a chat packet", ""]
                ]);
            case Packets.BARITONE:
                return new Map<string, string>([
                    ["The worker attempted to execute the Baritone command", ""]
                ]);
            case Packets.LAMBDA:
                return new Map<string, string>([
                    ["The worker attempted to execute the Lambda command", ""]
                ]);
            case Packets.ERROR:
                return new Map<string, string>([
                    ["The server has sent an error packet", ""]
                ]);
            case Packets.LISTENER_ADD:
                return new Map<string, string>([
                    ["A new listener has been added to the socket", ""]
                ]);
            case Packets.LISTENER_REMOVE:
                return new Map<string, string>([
                    ["A listener has been removed from the socket", ""]
                ]);
            case Packets.HIGHWAY_TOOLS:
                return new Map<string, string>([
                    ["The worker attempted to execute the HighwayTools command", ""]
                ]);
            case Packets.SCREENSHOT:
                return new Map<string, string>([
                    ["The worker returned a screenshot", ""]
                ]);
            case Packets.GET_JOBS:
                return new Map<string, string>([
                    ["The worker returned a list of jobs", this.Args().join(" ")]
                ]);
            case Packets.ROTATE:
                return new Map<string, string>([
                    ["The worker rotated to:", this.Args().join(" ")]
                ]);
        }
    }

    public static getFlag(flag: string): Flags {
        return parseInt(Flags[parseInt(flag)]);
    }

    public static fromBuffer(buffer: Buffer): Packet | null {
        if (buffer.toString() === "\n") return null
        const args = buffer.toString().split(" ");
        return new Packet(parseInt(args[0]), Boolean(args[1]), parseInt(args[2]), this.getFlag(args[3]), args.slice(4).map((arg) => arg.split(" ")));
    }

    public humanize(): Map<string, string> {
        const map = new Map<string, string>();
        map.set("Length:", this.length.toString());
        map.set("Fragmented?:", this.fragmented.toString());
        map.set("Packet:", Packets[this.byte]);
        map.set("Destination", Flags[this.flag]);
        const args = this.humanizeArgs()
        for (const [key, value] of args) {
            map.set(key, value);
        }
        return map;
    }
}
