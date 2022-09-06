export type ICancellable<T extends any> = T & {
    cancel(): void;
};