import PropTypes from 'prop-types'
import { radius } from '../utils'

const height = radius / 2
const points = [
  `0,${height}`,
  `0,${height / 2}`,
  `${height / 4},${height / 2}`,
  `${height / 4},${height / 4}`,
  `${height * 0.63},0`,
  `${height},${height / 4}`,
  `${height},${height}`,
].join(' ')

const City = ({ color }) => (
  <g transform={`translate(${-height / 2}, ${-height / 2})`}>
    <polygon
      strokeWidth={radius / 40}
      stroke="black"
      fill={`url(#${color})`}
      points={points}
    />
  </g>
)

City.propTypes = {
  color: PropTypes.string.isRequired,
}

export default City
