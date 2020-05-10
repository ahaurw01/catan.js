import PropTypes from 'prop-types'
import styles from './Tile.module.css'
import { axialToCartesian, makeHexagonPoints } from '../utils'

const Tile = ({ q, r, type }) => {
  const { x, y } = axialToCartesian({ q, r })
  const points = makeHexagonPoints({ x, y })
    .map((p) => `${p.x},${p.y}`)
    .join(' ')

  return (
    <g>
      <polygon points={points} fill="green" strokeWidth="1" stroke="black" />
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
}

export default Tile
