export interface IIndexer {
    get<T, K extends keyof T>(key: K, options: T[]): T[K][] | undefined
}