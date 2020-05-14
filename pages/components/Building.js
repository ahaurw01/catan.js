import PropTypes from 'prop-types'
import cx from 'classnames'
import { axialVertexToCartesian, radius, vertexPropType } from './utils'
import styles from './Building.module.css'

const Building = ({ vertex, color, type, isBuildable, onBuild, onRemove }) => {
  const { x, y } = axialVertexToCartesian(vertex)
  const width = type === 'settlement' ? radius / 3 : radius / 2
  const icon = type === 'settlement' ? 'S' : 'C'
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        className={cx({ [styles.isBuildable]: isBuildable })}
        x={-width / 2}
        y={-width / 2}
        width={width}
        height={width}
        stroke="black"
        fill={isBuildable ? 'purple' : color}
        onClick={onBuild}
        onContextMenu={(e) => {
          e.preventDefault()
          onRemove()
        }}
      />
      <text textAnchor="middle" className={styles.icon} y="8">
        {icon}
      </text>
    </g>
  )
}

Building.propTypes = {
  vertex: vertexPropType,
  color: PropTypes.string,
  type: PropTypes.oneOf(['settlement', 'city']).isRequired,
  isBuildable: PropTypes.bool,
  onBuild: PropTypes.func,
  onRemove: PropTypes.func,
}

Building.defaultProps = {
  isBuildable: false,
  onBuild: () => {},
  onRemove: () => {},
}

export default Building
