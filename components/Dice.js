import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './Dice.module.css'
import cx from 'classnames'
import Die from './Die'

const Dice = ({ roll1, roll2, id, onRoll }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [skip, setSkip] = useState(true)
  useEffect(() => {
    if (skip) {
      setSkip(false)
      return
    }
    setIsExpanded(true)
    setTimeout(() => {
      setIsExpanded(false)
    }, 1500)
  }, [id])
  return (
    <div
      className={cx(styles.wrapper, { [styles.expanded]: isExpanded })}
      onClick={() => {
        if (!isExpanded) onRoll()
      }}
    >
      <Die number={roll1} />
      <Die number={roll2} inverted />
    </div>
  )
}

Dice.propTypes = {
  roll1: PropTypes.number.isRequired,
  roll2: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  onRoll: PropTypes.func.isRequired,
}

export default Dice
