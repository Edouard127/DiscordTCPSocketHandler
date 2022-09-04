import { EventEmitter} from "node:events";
import {Command} from "./AbstractCommand";

export default class EventListener {
    sendEvent(event: string, ...args: any[]) { }
    registerListener(e: Command) { }
}