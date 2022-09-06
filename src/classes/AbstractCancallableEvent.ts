import {ICancellable} from "../interfaces/ICancellable";
import EventListener from "./EventListener";

export default class AbstractCancallableEvent implements ICancellable<EventListener> {
    cancel(): void {
        throw new Error("Method not implemented.");
    }

    on(args: any): void {
        throw new Error("Method not implemented.");
    }

    sendEvent(args: any): void {
        throw new Error("Method not implemented.");
    }
}