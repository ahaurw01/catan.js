import PropTypes from 'prop-types'
import {
  radius,
  sidePropType,
  axialSideToPortCartesian,
  anglePerpendicularToSide,
} from './utils'
import Brick from './icons/Brick'
import Grain from './icons/Grain'
import Lumber from './icons/Lumber'
import Ore from './icons/Ore'
import Wool from './icons/Wool'
import Any from './icons/Any'

const icons = {
  brick: Brick,
  grain: Grain,
  lumber: Lumber,
  ore: Ore,
  wool: Wool,
  any: Any,
}

const Port = ({ side, ratio, goods }) => {
  const { x, y } = axialSideToPortCartesian(side)
  const width = radius / 2
  const Icon = icons[goods]
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${anglePerpendicularToSide(
        side
      )})`}
    >
      <rect
        x={-width / 2}
        y={-width / 2}
        width={width}
        height={width}
        stroke="black"
        fill="white"
        rx={radius / 40}
      />
      <g transform={`translate(${-radius / 6} ${-radius / 3.7})`}>
        <Icon width={radius / 3} height={radius / 3} />
      </g>
      <g transform={`translate(0 ${radius / 5})`}>
        <text textAnchor="middle" y="0" style={{ fontSize: `${radius / 6}px` }}>
          {ratio} : 1
        </text>
      </g>
    </g>
  )
}

Port.propTypes = {
  side: sidePropType,
  goods: PropTypes.oneOf(['lumber', 'grain', 'brick', 'ore', 'wool', 'any'])
    .isRequired,
  ratio: PropTypes.number.isRequired,
}

export default Port
