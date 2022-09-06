import net from 'net';
import {commands} from "../handlers/slash";
import Packet from "../classes/Packet";

export async function connectToSocket(conn: net.Socket, i: any, host: string, port: number): Promise<any> {
    const instance = commands.getOrNull(i.name)
    if (!instance) throw new Error(`Command ${i} does not exist!`)
    try {
        return await new Promise((resolve) => {
            conn.connect(port, host, () => {
                conn.write(Buffer.from("10 0 13 0"))
                resolve(true)
            })
            conn.on('data', (data) => {
                const command = Packet.fromBuffer(data)
                if (command) instance.sendEvent(command)
            })
            conn.on('error', () => {
                instance.cancel()
            })
        })
    } catch (e) {
        throw new Error("Failed to communicate with the socket")
    }
}