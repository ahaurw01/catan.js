import PropTypes from 'prop-types'
import { radius } from '../utils'

const height = radius / 3
const points = [
  `0,${height}`,
  `0,${height * 0.4}`,
  `${height / 2},0`,
  `${height},${height * 0.4}`,
  `${height},${height}`,
].join(' ')

const Settlement = ({ color, fade }) => (
  <g transform={`translate(${-height / 2}, ${-height / 2})`}>
    <polygon
      fill={`url(#${color})`}
      stroke="black"
      strokeWidth={radius / 40}
      points={points}
      style={{ opacity: fade ? 0.5 : 1 }}
    />
  </g>
)

Settlement.propTypes = {
  color: PropTypes.string.isRequired,
  fade: PropTypes.bool,
}

export default Settlement
