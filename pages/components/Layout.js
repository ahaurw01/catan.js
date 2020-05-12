import PropTypes from 'prop-types'
import styles from './Layout.module.css'

const Layout = ({ boardSlot, actionSlot, itemSlot }) => (
  <div className={styles.layout}>
    <div className={styles.actionBoardWrapper}>
      <div className={styles.action}>{actionSlot}</div>
      <div className={styles.board}>{boardSlot}</div>
    </div>
    <div className={styles.item}>{itemSlot}</div>
  </div>
)

Layout.propTypes = {
  boardSlot: PropTypes.node.isRequired,
  actionSlot: PropTypes.node.isRequired,
  itemSlot: PropTypes.node.isRequired,
}

export default Layout
