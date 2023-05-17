<script context="module" lang="ts">
    const key = Symbol();
    export { key };
</script>

<script lang="ts">
    import { windowHeight, windowWidth } from "./gameStores";
    let canvas: HTMLCanvasElement;

    import { afterUpdate, onMount, tick } from "svelte";
    import { Renderer } from "./renderer";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    let renderer = writable<Renderer | undefined>(undefined);

    setContext(key, { renderer });

    onMount(async () => {
        $renderer = await Renderer.create(canvas);
    });

    afterUpdate(() => {
        $renderer?.render();
    });
</script>

<canvas
    width={$windowWidth}
    height={$windowHeight}
    bind:this={canvas}
    class="screen absolute"
/>

<slot />
