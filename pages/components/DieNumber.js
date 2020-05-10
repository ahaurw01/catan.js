import PropTypes from 'prop-types'
import { axialToCartesian, makeHexagonPoints } from '../utils'
import styles from './DieNumber.module.css'

const DieNumber = ({ value }) => {
  return (
    <g>
      <circle r="20" cx="0" cy="0" stroke="black" fill="white" />
      <text
        textAnchor="middle"
        className={styles.text}
        x="0"
        y="5"
        fill={value === 6 || value === 8 ? 'red' : 'black'}
      >
        {value}
      </text>
    </g>
  )
}

DieNumber.propTypes = {
  value: PropTypes.number.isRequired,
}

export default DieNumber
