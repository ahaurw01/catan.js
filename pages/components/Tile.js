import PropTypes from 'prop-types'
import { axialToCartesian, makeHexagonPoints } from '../utils'
import DieNumber from './DieNumber'

const Tile = ({ q, r, type, dieNumber }) => {
  const { x, y } = axialToCartesian({ q, r })
  const points = makeHexagonPoints({ x, y })
    .map((p) => `${p.x},${p.y}`)
    .join(' ')

  return (
    <g>
      <polygon points={points} fill="green" strokeWidth="1" stroke="black" />
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
