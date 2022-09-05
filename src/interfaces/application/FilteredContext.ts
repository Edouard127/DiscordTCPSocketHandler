import {Context} from "./Context";

export type FilteredContext<K, T extends keyof Context<K>> = Pick<Context<K>, T>;
