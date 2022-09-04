export {}


declare global {
    interface Set<T> {
        getOrNull(i: number): T | null;
        getAnyOrNull(): T | null;
    }
    interface Map<K, V> {
        getOrNull(s: any): If<K, V | null, (s: K) => V | null>;
        getAnyOrNull(s: any): If<K, V | null, (s: K) => V | null>;
        Iterate(): IterableIterator<[K, V]>;
    }
    type If<T extends any, A, B = null> = T extends any ? A : T extends null ? B : A | B;
}

