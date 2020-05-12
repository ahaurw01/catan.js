import PropTypes from 'prop-types'
import { radius, axialToCartesian, makeHexagonPoints } from '../utils'
import RobberIcon from './icons/Robber'

const Robber = ({ q, r }) => {
  const { x, y } = axialToCartesian({ q, r })

  const width = radius * 1.5

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`translate(${-width / 2}, ${-width / 1.75})`}>
        <RobberIcon width={width} height={width} />
      </g>
    </g>
  )
}
Robber.propTypes = {
  q: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
}

export default Robber
