import PropTypes from 'prop-types'
import cx from 'classnames'
import {
  axialVertexToCartesian,
  radius,
  sidePropType,
  angleOfSide,
} from './utils'
import styles from './Road.module.css'

const Road = ({ side, color, isBuildable, onBuild, onRemove }) => {
  const { x, y } = axialVertexToCartesian(side)
  const angle = angleOfSide(side)
  const length = radius / 1.5
  const height = length / 5
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
      <rect
        className={cx({ [styles.isBuildable]: isBuildable })}
        x={-length / 2}
        y={-height / 2}
        width={length}
        height={height}
        stroke="black"
        strokeWidth={radius / 40}
        fill={`url(#${color})`}
        onClick={onBuild}
        onContextMenu={(e) => {
          e.preventDefault()
          onRemove()
        }}
      />
    </g>
  )
}

Road.propTypes = {
  side: sidePropType,
  color: PropTypes.string,
  isBuildable: PropTypes.bool,
  onBuild: PropTypes.func,
  onRemove: PropTypes.func,
}

Road.defaultProps = {
  color: null,
  isBuildable: false,
  onBuild: () => {},
  onRemove: () => {},
}

export default Road
