<script lang="ts">
  import io from "socket.io-client";
  import { num } from "./playerStores";

  const colors = [["#DD5454"], ["#9ED5C5"], ["#FFD8A9"], ["#8D72E1"]] as const;
  let color = "#FFFFFF";

  let origin = window.location.origin;

  const socket = io(origin);

  let code = window.location.pathname.split("/").pop();

  socket.emit("join", { code }, (info) => {
    if (info?.error) {
      alert(info.error);
      return;
    }

    $num = info?.num;
    color = colors[$num][0];

    console.log(info);
  });
</script>

<main class="screen t-md center" style="background-color: {color}">
  {#if $num !== undefined}
    <div class="center bounce">
      <h2>You are Player</h2>
      <img src="icons/{$num}.png" alt="" />
      <h2>!</h2>
    </div>
  {/if}
</main>

<style>
  img {
    height: 2em;
    margin: 0.5em;
  }
</style>
