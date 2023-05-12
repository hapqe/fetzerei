import './app.css'
import App from './App.svelte'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

const app = new App({
  target: document.getElementById('app'),
})

export default app
