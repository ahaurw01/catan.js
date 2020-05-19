import PropTypes from 'prop-types'
import styles from './Layout.module.css'
import { Window, WindowContent, WindowHeader } from 'react95'

const Layout = ({ boardSlot, actionSlot, itemSlot }) => (
  <Window className={styles.mainWindow}>
    <WindowHeader className={styles.windowHeader}>
      <span>C:\Games\Settlers.exe</span>
    </WindowHeader>
    <WindowContent className={styles.windowContent}>
      <div className={styles.layout}>
        <div className={styles.actionBoardWrapper}>
          <div className={styles.action}>{actionSlot}</div>
          <div className={styles.board}>{boardSlot}</div>
        </div>
        <div className={styles.item}>{itemSlot}</div>
      </div>
    </WindowContent>
  </Window>
)

Layout.propTypes = {
  boardSlot: PropTypes.node.isRequired,
  actionSlot: PropTypes.node.isRequired,
  itemSlot: PropTypes.node.isRequired,
}

export default Layout
