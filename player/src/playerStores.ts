import { writable } from "svelte/store";

export const num = writable<number | undefined>(undefined);
export const id = writable<string | undefined>(undefined);