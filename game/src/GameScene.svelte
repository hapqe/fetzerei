<script lang="ts">
    import { onMount } from "svelte";
    import { windowHeight, windowWidth } from "./gameStores";
    import { Scene } from "./scene";
    import { Renderer } from "./renderer";
    let canvas: HTMLCanvasElement;

    onMount(async () => {
        const renderer = await Renderer.create(canvas);
        const gltf = await Scene.load("test.glb", renderer);

        const pass = renderer.encoder.beginRenderPass({
            colorAttachments: [
                {
                    clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },
                    view: renderer.context.getCurrentTexture().createView(),
                    loadOp: "clear",
                    storeOp: "store",
                },
            ],
        });

        gltf.draw(pass);
        pass.end();
        renderer.device.queue.submit([renderer.encoder.finish()]);
    });
</script>

<canvas
    width={$windowWidth}
    height={$windowHeight}
    bind:this={canvas}
    class="screen"
/>
