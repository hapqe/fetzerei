<script lang="ts">
    import { Canvas, T } from "@threlte/core";
    import { windowHeight, windowWidth } from "./gameStores";
    import Cursor from "./Cursor.svelte";

    let width = window.innerWidth;

    let camera;
    $: if (camera) camera.lookAt(0, 0, 0);
</script>

<main class="screen">
    <Canvas>
        <T.OrthographicCamera
            bind:ref={camera}
            makeDefault
            position={[10, 8, 10]}
            zoom={Math.min($windowWidth * 0.65, $windowHeight * 1.2)}
        />
        <T.Mesh rotation.x={-Math.PI / 2}>
            <T.PlaneGeometry />
            <T.MeshToonMaterial color="#fff" />
        </T.Mesh>

        <Cursor />
    </Canvas>
</main>
