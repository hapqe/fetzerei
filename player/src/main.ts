import './app.css'
import Player from './Player.svelte'

const app = new Player({
  target: document.getElementById('app'),
})

export default app
