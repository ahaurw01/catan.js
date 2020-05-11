import PropTypes from 'prop-types'
import { axialToCartesian, makeHexagonPoints } from '../utils'
import DieNumber from './DieNumber'

const colors = {
  forest: '#5AA260',
  pasture: '#36F76C',
  mountains: '#BDB6B2',
  hills: '#C1591C',
  fields: '#FADD3A',
  desert: '#E1AB4E',
}

const Tile = ({ q, r, type, dieNumber }) => {
  const { x, y } = axialToCartesian({ q, r })
  const points = makeHexagonPoints({ x, y })
    .map((p) => `${p.x},${p.y}`)
    .join(' ')

  return (
    <g>
      <polygon
        points={points}
        fill={colors[type]}
        strokeWidth="5"
        stroke="#333"
      />
      {dieNumber != null && (
        <g transform={`translate(${x}, ${y})`}>
          <DieNumber value={dieNumber} />
        </g>
      )}
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
