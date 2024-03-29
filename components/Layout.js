import PropTypes from 'prop-types'
import styles from './Layout.module.css'
import { Window, WindowContent, WindowHeader } from 'react95'
import WindowButtons, {
  CloseButton,
  MinimizeButton,
  MaximizeButton,
} from './WindowButtons'

const Layout = ({
  boardSlot,
  actionSlot,
  itemSlot,
  onMinimize,
  onMaximize,
  onClose,
}) => (
  <Window className={styles.mainWindow}>
    <WindowHeader className={styles.windowHeader}>
      <span className={styles.noPointerEvents}>
        <span className={styles.icon}>🌄</span>C:\Games\Settlers.exe
      </span>

      <WindowButtons>
        <MinimizeButton onClick={onMinimize} />
        <MaximizeButton onClick={onMaximize} />
        <CloseButton onClick={onClose} />
      </WindowButtons>
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
  onMinimize: PropTypes.func.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Layout
