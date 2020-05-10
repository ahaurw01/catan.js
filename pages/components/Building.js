import PropTypes from 'prop-types'
import { axialVertexToCartesian, radius, vertexPropType } from '../utils'

const Building = ({ vertex, color, type }) => {
  const { x, y } = axialVertexToCartesian(vertex)
  const width = type === 'settlement' ? radius / 4 : radius / 3
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={-width / 2}
        y={-width / 2}
        width={width}
        height={width}
        stroke="black"
        fill={color}
      />
    </g>
  )
}

Building.propTypes = {
  vertex: vertexPropType,
  color: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['settlement', 'city']),
}

export default Building
