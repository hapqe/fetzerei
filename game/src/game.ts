import './game.css'
import Game from './Game.svelte'

const app = new Game({
  target: document.getElementById('app'),
})

export default app
