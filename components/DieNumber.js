import PropTypes from 'prop-types'
import { radius } from './utils'
import styles from './DieNumber.module.css'

const DieNumber = ({ value, highlight }) => {
  return (
    <g>
      <circle
        r={radius / 4}
        cx="0"
        cy="0"
        stroke="black"
        fill={highlight ? 'black' : 'white'}
      />
      <text
        textAnchor="middle"
        className={styles.text}
        x="0"
        y={radius / 10}
        fill={
          highlight ? 'white' : value === 6 || value === 8 ? 'red' : 'black'
        }
      >
        {value}
      </text>
    </g>
  )
}

DieNumber.propTypes = {
  value: PropTypes.number.isRequired,
  highlight: PropTypes.bool,
}

DieNumber.defaultProps = {
  highlight: false,
}

export default DieNumber
