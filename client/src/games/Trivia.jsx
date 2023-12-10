import './games-styles/Trivia-style.css'

import { useState, useEffect } from 'react'

export const Trivia = () => {
  const [index, setIndex] = useState(0)
  const [respuestas, setRespuestas] = useState([])
  const [preguntas, setPreguntas] = useState([])

  useEffect(() => {
    // Llamada a la API de Open Trivia Database con lang=es para obtener preguntas en español
    fetch('https://opentdb.com/api.php?amount=10&type=multiple&lang=es')
      .then((response) => response.json())
      .then((data) => {
        const preguntas = data.results.map((pregunta, index) => ({
          id: index,
          pregunta: pregunta.question,
          opciones: [
            ...pregunta.incorrect_answers,
            pregunta.correct_answer,
          ].sort(() => Math.random() - 0.5),
          respuestaCorrecta: pregunta.correct_answer,
        }))
        setPreguntas(preguntas)
      })
      .catch((error) => console.error('Error al obtener preguntas:', error))
  }, [])

  const manejarRespuesta = (respuesta) => {
    if (
      respuesta.toLowerCase() ===
      preguntas[index].respuestaCorrecta.toLowerCase()
    ) {
      alert('¡Correcto!')
    } else {
      alert('Incorrecto. Intenta de nuevo.')
    }

    setRespuestas([...respuestas, respuesta])
    setIndex(index + 1)

    if (index === preguntas.length - 1) {
      setIndex(0)
      setRespuestas([])
      alert('Fin del juego. ¡Comencemos de nuevo!')
    }
  }

  return (
    <div className="Trivia-container">
      <h1 className="Trivia-title">Trivia</h1>
      {index < preguntas.length && (
        <>
          <p className="Question">{preguntas[index].pregunta}</p>
          <div className="Trivia-question-container">
            {preguntas[index].opciones.map((opcion, idx) => (
              <button
                translate="no"
                className="Trivia-question"
                key={idx}
                onClick={() => manejarRespuesta(opcion)}
              >
                {opcion}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
