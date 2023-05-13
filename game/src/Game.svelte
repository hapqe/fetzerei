<script lang="ts">
  import io from 'socket.io-client'
    import { code } from './stores';
    import Qr from './lib/Qr.svelte';
    import Background from './lib/Background.svelte';
    import Logo from './lib/Logo.svelte';
    import Bubbles from './lib/Bubbles.svelte';
  let id: string = undefined;
  
  let origin = window.location.origin;
  
  const socket = io(origin)

  socket.emit('room', {}, (room) => {
    if(room?.code)
      code.set(room.code);
  });
</script>

<main>
  <Logo/>
  <Qr/>
  <Background/>
  <Bubbles/>
</main>