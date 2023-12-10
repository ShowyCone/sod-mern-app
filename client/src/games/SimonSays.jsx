import { useEffect, useState } from 'react'
import { SimonSaysButtons } from './games-components/SimonSaysButtons'
import useSound from 'use-sound'
import audio0 from '../audio/0.aac'
import audio1 from '../audio/1.aac'
import audio2 from '../audio/2.aac'
import audio3 from '../audio/3.aac'
import correct from '../audio/correct.mp3'
import wrong from '../audio/wrong.mp3'
import './games-styles/SimonSays-style.css'
import border from '../assets/SimonSays-border.png'

export const SimonSays = () => {
  const [sequenceIsStart, setSequenceIsStart] = useState(false)
  const [userSequence, setUserSequence] = useState([])
  const [score, setScore] = useState(0)
  const [startGame, setStartGame] = useState(false)
  const [sequence, setSequence] = useState([])
  const [attempts, setAttempts] = useState(0)
  const [lives, setLives] = useState(4)
  const [play0] = useSound(audio0)
  const [play1] = useSound(audio1)
  const [play2] = useSound(audio2)
  const [play3] = useSound(audio3)
  const [correctAns] = useSound(correct)
  const [wrongAns] = useSound(wrong)
  const soundMap = {
    0: play0,
    1: play1,
    2: play2,
    3: play3,
  }
  function playSounds(sound) {
    const playedSound = soundMap[sound]
    playedSound()
  }

  // hover settings
  const [isHovered, setIsHovered] = useState([false, false, false, false])
  const handleIsHoveredToggle = (index) => {
    setIsHovered((prevHover) => {
      const newHover = [...prevHover]
      newHover[index] = true
      return newHover
    })
    setTimeout(
      () =>
        setIsHovered((prevHover) => {
          const newHover = [...prevHover]
          newHover[index] = false
          return newHover
        }),
      250
    )
  }

  useEffect(() => {
    setSequence([])
  }, [score])

  // verifica si el usuario gana o pierde
  useEffect(() => {
    if (
      JSON.stringify(userSequence) != JSON.stringify(sequence) &&
      attempts === 0 &&
      startGame
    ) {
      wrongAns()
    } else if (
      JSON.stringify(userSequence) == JSON.stringify(sequence) &&
      attempts === 0 &&
      startGame
    ) {
      correctAns()
      setLives(4)
      setScore((prevScore) => prevScore + 1)
    }
  }, [userSequence])

  // manejo de keyboard events
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (startGame && !sequenceIsStart && attempts > 0) {
        setAttempts((prevAttempts) => prevAttempts - 1)
      }

      const keyActions = {
        q: () => handleKeyAction(0),
        w: () => handleKeyAction(1),
        a: () => handleKeyAction(2),
        s: () => handleKeyAction(3),
        Enter: () => handleAutoAction(),
      }

      if (!sequenceIsStart) {
        const action = keyActions[event.key]
        if (event.key === 'Enter') {
          action()
        } else if (action && event.key !== 'Enter' && attempts > 0) {
          action()
        }
        if (attempts === 1) {
        }
      }
    }

    const handleKeyAction = (index) => {
      handleIsHoveredToggle(index)
      playSounds(index)
      if (startGame && !sequenceIsStart) {
        setUserSequence((prevSequence) => [...prevSequence, index])
      }
    }

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    const handleAutoAction = async () => {
      if (lives > 0) setLives((prevLives) => prevLives - 1)
      setStartGame(true)
      if (lives > 0) {
        setSequenceIsStart(true)
        for (const n of sequence) {
          await delay(1000)
          console.log(n)
          handleKeyAction(n)
        }
      }
      setUserSequence([])
      setSequenceIsStart(false)
    }

    document.addEventListener('keypress', handleKeyPress)

    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [handleIsHoveredToggle, playSounds, sequence])

  useEffect(() => {
    setAttempts(sequence.length)
    const getSequence = () => {
      const newSequence = []
      for (let i = 0; i < 6; i++)
        newSequence.push(Math.floor(Math.random() * 4))
      return newSequence
    }
    const setAutoSequence = () => {
      if (sequence.length === 0) {
        const newSequence = getSequence()
        setSequence(newSequence)
      }
    }

    setAutoSequence()
    console.log(sequence, sequenceIsStart)
  }, [sequenceIsStart, sequence])

  return (
    <div className="SimonSays-container">
      <h1 className="SimonSays-title">SIMON SAYS</h1>
      <div className="lives">Vidas: {lives}</div>
      <div className="score">Puntaje: {score}</div>
      <div className="SimonSays-container-game">
        <div className="SimonSays-button-container">
          <SimonSaysButtons keyToPress="Q" hover={isHovered[0]} />
          <SimonSaysButtons keyToPress="W" hover={isHovered[1]} />
          <SimonSaysButtons keyToPress="A" hover={isHovered[2]} />
          <SimonSaysButtons keyToPress="S" hover={isHovered[3]} />
        </div>
        <img src={border} alt="" className="border" />
      </div>
    </div>
  )
}
