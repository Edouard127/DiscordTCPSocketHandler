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

        map<T>(fn: (value: V, key: K, map: Map<K, V>) => T): T[];
    }

    interface Array<T> {
        getOrNull(i: number): T | null;
        getOr(i: number, def: T): T;
        removeNull(): T[];
        removeAt(i: number): T[];
    }

    type If<T extends any, A, B = null> = T extends any ? A : T extends null ? B : A | B;

}

