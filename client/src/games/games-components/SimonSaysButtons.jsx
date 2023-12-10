import '../games-styles/SimonSays-style.css'

export const SimonSaysButtons = ({ keyToPress, onClick, hover }) => {
  const isHovered = hover

  return (
    <button
      className={
        isHovered ? 'SimonSays-buttons hovered-button' : 'SimonSays-buttons'
      }
    >
      <span>{keyToPress}</span>
    </button>
  )
}
