import Packet from "./Packet";

export default interface EventListener {
    sendEvent(args: any): void;
    on(args: any | null): void;
}