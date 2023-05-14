import { writable } from "svelte/store";

export const code = writable<string | undefined>(undefined);
export const joined = writable<(boolean | undefined)[]>([undefined, undefined, undefined, undefined]);

export const windowWidth = writable<number>(window.innerWidth);
export const windowHeight = writable<number>(window.innerHeight);