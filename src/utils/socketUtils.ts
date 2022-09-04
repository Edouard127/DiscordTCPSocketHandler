import net from 'net';
import {commands} from "../handlers/slash";

export function connectToSocket(i: any, host: string, port: number) {
    //const socket = new net.Socket();
    const instance = commands.getOrNull(i.name)
    if (!instance) throw new Error(`Command ${i} does not exist!`)
    instance.sendEvent("data", "Hello", "uwu")
    /*socket.on("data", (data) => {
        instance.sendEvent(data)
    });*/
}
