import PropTypes from 'prop-types'
import {
  axialVertexToCartesian,
  radius,
  sidePropType,
  angleOfSide,
} from '../utils'

const Road = ({ side, color }) => {
  const { x, y } = axialVertexToCartesian(side)
  const angle = angleOfSide(side)
  const length = radius / 1.5
  const height = length / 5
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
      <rect
        x={-length / 2}
        y={-height / 2}
        width={length}
        height={height}
        stroke="black"
        fill={color}
      />
    </g>
  )
}

Road.propTypes = {
  side: sidePropType,
  color: PropTypes.string.isRequired,
}

export default Road
