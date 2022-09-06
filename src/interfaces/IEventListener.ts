export default interface IEventListener {
    sendEvent(args: any): void;
    on(args: any): void;
}