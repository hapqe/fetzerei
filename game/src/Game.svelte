<script lang="ts">
  import io from "socket.io-client";
  import { code, joined, windowHeight, windowWidth } from "./gameStores";
  import Qr from "./lib/Qr.svelte";
  import Background from "./lib/Background.svelte";
  import Logo from "./lib/Logo.svelte";
  import Bubbles from "./lib/Bubbles.svelte";
  import GameScene from "./GameScene.svelte";
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
</script>

<svelte:window
  bind:innerWidth={$windowWidth}
  bind:innerHeight={$windowHeight}
/>

<main>
  <!-- <Logo />
  <Qr />
  <Bubbles /> -->
  <Background />
  <GameScene />
</main>
