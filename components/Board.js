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

      <pattern id="white" patternUnits="userSpaceOnUse" width="20" height="20">
        <rect x="0" y="0" width="20" height="20" fill="white" />
      </pattern>

      <pattern
        id="green"
        patternUnits="userSpaceOnUse"
        width="40"
        height="40"
        patternTransform="scale(0.5)"
      >
        <rect x="0" y="0" width="40" height="40" fill="green" />
        <path fill="white" d="M0 40L40 0H20L0 20M40 40V20L20 40" />
      </pattern>

      <pattern
        id="orange"
        patternUnits="userSpaceOnUse"
        width="8"
        height="8"
        patternTransform="scale(2)"
      >
        <rect x="0" y="0" width="8" height="8" fill="darkorange" />
        <path fill="white" d="M0 0h4v4H0V0zm4 4h4v4H4V4z" />
      </pattern>

      <pattern id="clear" patternUnits="userSpaceOnUse" width="20" height="20">
        <rect x="0" y="0" width="20" height="20" fill="rgba(255,255,255,0.5)" />
      </pattern>
    </defs>
    {children}
  </svg>
)

export default Board
