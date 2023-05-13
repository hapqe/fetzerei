import { writable } from "svelte/store";

export const code = writable<string | undefined>(undefined);