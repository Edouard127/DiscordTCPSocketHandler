import {ICancellable} from "../interfaces/ICancellable";
import IEventListener from "../interfaces/IEventListener";

export default class AbstractCancallableEvent implements ICancellable<IEventListener> {
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