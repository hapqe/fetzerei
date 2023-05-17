<script lang="ts">
  import io from "socket.io-client";
  import { code, joined, windowHeight, windowWidth } from "./gameStores";
  import Qr from "./lib/Qr.svelte";
  import Background from "./lib/Background.svelte";
  import Logo from "./lib/Logo.svelte";
  import Bubbles from "./lib/Bubbles.svelte";
  import Canvas from "./Canvas.svelte";
  import Scene from "./Scene.svelte";
  let id: string = undefined;

  let origin = window.location.origin;

  const socket = io(origin);

  socket.emit("room", {}, (room) => {
    if (room?.code) code.set(room.code);
  });

  socket.on("joined", (info) => {
    $joined[info!.num] = true;
  });

  socket.on("left", (info) => {
    $joined[info!.num] = false;
  });

  let snagg = false;
</script>

<svelte:window
  bind:innerWidth={$windowWidth}
  bind:innerHeight={$windowHeight}
/>

<main>
  <!-- <Logo />
  <Qr />
  <Bubbles /> -->
  <Canvas>
    <Scene gltf="scene.glb" />
  </Canvas>
  <Background />

  <button on:click={() => (snagg = !snagg)} class="absolute">Hello</button>
</main>
