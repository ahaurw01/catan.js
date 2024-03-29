import PropTypes from 'prop-types'
import cx from 'classnames'
import { axialVertexToCartesian, vertexPropType } from './utils'
import styles from './Building.module.css'
import Settlement from './icons/Settlement'
import City from './icons/City'

const Building = ({
  vertex,
  color,
  type,
  isBuildable,
  isUpgradeable,
  onBuild,
  onRemove,
  onUpgrade,
}) => {
  const { x, y } = axialVertexToCartesian(vertex)
  const Icon = type === 'settlement' ? Settlement : City
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={cx({
        [styles.pointer]: isBuildable || isUpgradeable,
      })}
      onClick={isBuildable ? onBuild : isUpgradeable ? onUpgrade : undefined}
      onContextMenu={(e) => {
        e.preventDefault()
        onRemove()
      }}
    >
      <Icon
        color={isBuildable ? 'clear' : color}
        isUpgradeable={isUpgradeable}
      />
    </g>
  )
}

Building.propTypes = {
  vertex: vertexPropType,
  color: PropTypes.string,
  type: PropTypes.oneOf(['settlement', 'city']).isRequired,
  isBuildable: PropTypes.bool,
  isUpgradeable: PropTypes.bool,
  onBuild: PropTypes.func,
  onRemove: PropTypes.func,
}

Building.defaultProps = {
  isBuildable: false,
  isUpgradeable: false,
  onBuild: () => {},
  onRemove: () => {},
}

export default Building
