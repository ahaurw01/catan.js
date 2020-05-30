import PropTypes from 'prop-types'
import { radius } from '../utils'

const City = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 100 100">
    <polygon
      strokeWidth={radius / 40}
      stroke="black"
      fill={color}
      points="0,100 0,50 25,50 25,25 63,0 100,25 100,100"
    />
  </svg>
)

City.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}

export default City
