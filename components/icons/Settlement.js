import PropTypes from 'prop-types'
import { radius } from '../utils'
import cx from 'classnames'
import styles from './Settlement.module.css'

const height = radius / 3
const points = [
  `0,${height}`,
  `0,${height * 0.4}`,
  `${height / 2},0`,
  `${height},${height * 0.4}`,
  `${height},${height}`,
].join(' ')

const Settlement = ({ color, isUpgradeable }) => (
  <g transform={`translate(${-height / 2}, ${-height / 2})`}>
    <g className={cx({ [styles.pulse]: isUpgradeable })}>
      <polygon
        fill={`url(#${color})`}
        stroke="black"
        strokeWidth={radius / 40}
        points={points}
      />
    </g>
  </g>
)

Settlement.propTypes = {
  color: PropTypes.string.isRequired,
  isUpgradeable: PropTypes.bool,
}

Settlement.defaultProps = {
  isUpgradeable: false,
}

export default Settlement
