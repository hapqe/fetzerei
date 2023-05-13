<script lang="ts">
  import io from 'socket.io-client'
  let id: string = undefined;
  
  let origin = window.location.origin;

  const socket = io(origin)

  function click() {
    socket.emit('room', {}, (room) => {
      console.log(room);
    });
  }

  

</script>

<main>
  I AM THE PLAYER
</main>