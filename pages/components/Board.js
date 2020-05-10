import styles from './Board.module.css'

const Board = ({ children }) => (
  <svg
    viewBox="-500 -500 1000 1000"
    width="600"
    height="600"
    className={styles.board}
  >
    {children}
  </svg>
)

export default Board
