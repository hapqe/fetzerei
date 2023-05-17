<script lang="ts">
    import { getContext, onDestroy, onMount } from "svelte";
    import { key } from "./Canvas.svelte";
    import type { Renderer } from "./renderer";
    import { Scene } from "./scene";
    import { writable } from "svelte/store";
    import { mat4 } from "gl-matrix";

    let { renderer } = getContext(key) as any;
    let scene: Scene;
    let camera = writable(mat4.create());

    $: if ($renderer) {
        (async () => {
            if ($renderer.onRender.has(scene)) return;

            scene = await Scene.load(gltf, $renderer);
            $camera = scene.camera;
            $renderer.onRender.add(scene);
            $renderer = $renderer;
        })();
    }

    onDestroy(() => {
        $renderer?.onRender.delete(scene);
    });

    export let gltf: string;
</script>
