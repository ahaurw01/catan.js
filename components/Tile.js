import PropTypes from 'prop-types'
import { radius, axialToCartesian, makeHexagonPoints } from './utils'
import DieNumber from './DieNumber'
import Ore from './icons/Ore'
import Grain from './icons/Grain'
import Lumber from './icons/Lumber'
import Brick from './icons/Brick'
import Wool from './icons/Wool'

const colors = {
  forest: '#5AA260',
  pasture: '#36F76C',
  mountains: '#BDB6B2',
  hills: '#C1591C',
  fields: '#FADD3A',
  desert: '#E1AB4E',
}

const icons = {
  forest: Lumber,
  pasture: Wool,
  mountains: Ore,
  hills: Brick,
  fields: Grain,
}

const fillForType = {
  hills: 'url(#brick)',
  mountains: 'url(#ore)',
  forest: 'url(#forest)',
  desert: 'url(#minsweeper)',
  pasture: 'url(#pasture)',
  fields: 'url(#desert)',
}

const Tile = ({ q, r, type, dieNumber }) => {
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
        fill={fillForType[type] || colors[type]}
        strokeWidth="5"
        stroke="#333"
      />
      <g transform={`translate(${x}, ${y})`}>
        {dieNumber != null && <DieNumber value={dieNumber} />}
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
}

Tile.defaultProps = {
  type: null,
  dieNumber: null,
}

export default Tile
