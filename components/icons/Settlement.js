import PropTypes from 'prop-types'

const Settlement = ({ width, height, color, fade }) => (
  <svg width={width} height={height} viewBox="0 0 100 100">
    <polygon
      fill={color}
      stroke="black"
      points="0,100 0,40 50,0 100,40 100,100"
      style={{ opacity: fade ? 0.5 : 1 }}
    />
  </svg>
)

Settlement.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}

export default Settlement
