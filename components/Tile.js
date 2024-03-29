import PropTypes from 'prop-types'
import { radius, axialToCartesian, makeHexagonPoints } from './utils'
import DieNumber from './DieNumber'
import Ore from './icons/Ore'
import Grain from './icons/Grain'
import Lumber from './icons/Lumber'
import Brick from './icons/Brick'
import Wool from './icons/Wool'

const colors = {
  forest: '#009C40',
  pasture: '#80CF5B',
  mountains: '#818284',
  hills: '#EA5A00',
  fields: '#ECD847',
  desert: '#E7DED6',
}

const icons = {
  forest: Lumber,
  pasture: Wool,
  mountains: Ore,
  hills: Brick,
  fields: Grain,
}

const Tile = ({ q, r, type, dieNumber, rollTotal }) => {
  const { x, y } = axialToCartesian({ q, r })
  const points = makeHexagonPoints({ x, y })
    .map((p) => `${p.x},${p.y}`)
    .join(' ')
  const Icon =
    icons[type] ||
    function () {
      return null
    }
  const iconWidth = radius / 2

  return (
    <g>
      <polygon
        points={points}
        fill={colors[type]}
        strokeWidth="5"
        stroke="#333"
      />
      <g transform={`translate(${x}, ${y})`}>
        {dieNumber != null && (
          <DieNumber value={dieNumber} highlight={dieNumber === rollTotal} />
        )}
        <g transform={`translate(${-iconWidth / 2}, ${-radius / 1.25})`}>
          <Icon width={iconWidth} height={iconWidth} />
        </g>
      </g>
    </g>
  )
}
Tile.propTypes = {
  q: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  type: PropTypes.oneOf([
    'desert',
    'forest',
    'fields',
    'hills',
    'mountains',
    'pasture',
  ]),
  dieNumber: PropTypes.number,
  rollTotal: PropTypes.number,
}

Tile.defaultProps = {
  type: null,
  dieNumber: null,
  rollTotal: -1,
}

export default Tile
