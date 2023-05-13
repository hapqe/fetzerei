<script lang="ts">
  import io from "socket.io-client";
  let id: string | undefined = undefined;

  let origin = window.location.origin;

  const socket = io(origin);

  let code = window.location.pathname.split("/").pop();

  socket.emit("join", { code, id }, (info) => {
    if (info?.error) {
      alert(info.error);
      return;
    }
    id = info.id;
    console.log("joined", info);
  });
</script>

<main>I AM THE PLAYER</main>
