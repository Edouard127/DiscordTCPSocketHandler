import net from 'net';
import {commands} from "../handlers/slash";
import Packet from "../classes/Packet";

export function connectToSocket(i: any, host: string, port: number) {
    const instance = commands.getOrNull(i.name)
    if (!instance) throw new Error(`Command ${i} does not exist!`)
    const conn = new net.Socket();
    conn.connect(port, host, () => {
        conn.write(Buffer.from("10 0 13 0"))
    })
    conn.on("data", (data) => {
        const command = Packet.fromBuffer(data)
        console.log(command)
    });
}