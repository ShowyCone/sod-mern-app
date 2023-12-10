import { useRef, useEffect, useState } from 'react'
import { Menu } from '../views/Menu'
import { SimonSays } from '../games/SimonSays'
import { Trivia } from '../games/Trivia'
import mainTheme from '../audio/main-theme.mp3'
import useSound from 'use-sound'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './GameStyles.css'

export const Game = () => {
  const gameContainerRef = useRef(null)
  const [screen, setScreen] = useState('Menu')
  const [play] = useSound(mainTheme)
  const { logout } = useAuth()

  const handleFullscreen = () => {
    const gameContainer = gameContainerRef.current

    if (gameContainer) {
      if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen()
      } else if (gameContainer.mozRequestFullScreen) {
        gameContainer.mozRequestFullScreen()
      } else if (gameContainer.webkitRequestFullscreen) {
        gameContainer.webkitRequestFullscreen()
      }
    }
  }

  const changeScreen = (newScreen) => {
    setScreen(newScreen)
  }

  return (
    <main>
      <div ref={gameContainerRef} id="game-container">
        {screen === 'Menu' && <Menu changeScreen={changeScreen} />}
        {screen === 'SimonSays' && <SimonSays changeScreen={changeScreen} />}
        {screen === 'Trivia' && <Trivia changeScreen={changeScreen} />}
      </div>
      <div>
        <button className="button-fullscreen" onClick={handleFullscreen}>
          Pantalla completa
        </button>
        <Link
          to="/login"
          onClick={() => {
            logout()
          }}
        >
          Cerrar sesión
        </Link>
      </div>
    </main>
  )
}
