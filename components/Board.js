import styles from './Board.module.css'

const Board = ({ children }) => (
  <svg viewBox="-500 -500 1000 1000" className={styles.board}>
    <defs>
      <pattern
        id="blue"
        patternUnits="userSpaceOnUse"
        width="20"
        height="20"
        patternTransform="scale(0.9)"
      >
        <rect x="0" y="0" width="20" height="20" fill="blue" />
        <g fill="white" fillOpacity="1" fillRule="evenodd">
          <circle cx="3" cy="3" r="3" />
          <circle cx="13" cy="13" r="3" />
        </g>
      </pattern>
    </defs>
    {children}
  </svg>
)

export default Board
