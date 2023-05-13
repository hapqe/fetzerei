<script lang="ts">
  import io from 'socket.io-client'
  // optional
  let id: string = undefined;
  
  let uri = window.location.href;
  uri = uri.substring(0, uri.lastIndexOf('/'));
  
  const socket = io(uri)

  function click() {
    socket.emit('room', {}, (room) => {
      console.log(room);
    });
  }

  

</script>

<main>
  I AM THE PLAYER
</main>