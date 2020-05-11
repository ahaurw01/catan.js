import PropTypes from 'prop-types'
import { axialVertexToCartesian, radius, vertexPropType } from '../utils'
import styles from './Building.module.css'

const Building = ({ vertex, color, type }) => {
  const { x, y } = axialVertexToCartesian(vertex)
  const width = type === 'settlement' ? radius / 4 : radius / 3
  const icon = type === 'settlement' ? 'S' : 'C'
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
      <text textAnchor="middle" className={styles.icon} y="8">
        {icon}
      </text>
    </g>
  )
}

Building.propTypes = {
  vertex: vertexPropType,
  color: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['settlement', 'city']),
}

export default Building
