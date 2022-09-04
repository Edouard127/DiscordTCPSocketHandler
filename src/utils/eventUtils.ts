import { EventEmitter } from 'node:events';
import {commands} from "../handlers/slash";

const clientEvent = new EventEmitter();

export function emitEvent(event: string, dest: any, ...args: any[]) {
    const instance = commands.getOrNull(dest)
    if (!instance) throw new Error(`Command ${dest} does not exist!`)
    clientEvent.emit(event, instance, ...args)
}

