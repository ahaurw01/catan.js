import PropTypes from 'prop-types'
import styles from './Die.module.css'
import cx from 'classnames'

const Dice = ({ number }) => {
  switch (number) {
    case 1:
      return (
        <div className={cx(styles['first-face'], styles.face)}>
          <span className={styles['pip']}></span>
        </div>
      )
    case 2:
      return (
        <div className={cx(styles['second-face'], styles.face)}>
          <span className={styles['pip']}></span>
          <span className={styles['pip']}></span>
        </div>
      )
    case 3:
      return (
        <div className={cx(styles['third-face'], styles.face)}>
          <span className={styles['pip']}></span>
          <span className={styles['pip']}></span>
          <span className={styles['pip']}></span>
        </div>
      )
    case 4:
      return (
        <div className={cx(styles['fourth-face'], styles.face)}>
          <div className={styles['column']}>
            <span className={styles['pip']}></span>
            <span className={styles['pip']}></span>
          </div>
          <div className={styles['column']}>
            <span className={styles['pip']}></span>
            <span className={styles['pip']}></span>
          </div>
        </div>
      )
    case 5:
      return (
        <div className={cx(styles['fifth-face'], styles.face)}>
          <div className={styles['column']}>
            <span className={styles['pip']}></span>
            <span className={styles['pip']}></span>
          </div>
          <div className={styles['column']}>
            <span className={styles['pip']}></span>
          </div>
          <div className={styles['column']}>
            <span className={styles['pip']}></span>
            <span className={styles['pip']}></span>
          </div>
        </div>
      )
    case 6:
      return (
        <div className={cx(styles['sixth-face'], styles.face)}>
          <div className={styles['column']}>
            <span className={styles['pip']}></span>
            <span className={styles['pip']}></span>
            <span className={styles['pip']}></span>
          </div>
          <div className={styles['column']}>
            <span className={styles['pip']}></span>
            <span className={styles['pip']}></span>
            <span className={styles['pip']}></span>
          </div>
        </div>
      )
  }
}

Dice.propTypes = {
  number: PropTypes.number.isRequired,
}

export default Dice
