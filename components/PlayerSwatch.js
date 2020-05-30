import PropTypes from 'prop-types'

const PlayerSwatch = ({ color, size }) => {
  return (
    <svg width={size} height={size}>
      <rect
        x="0"
        y="0"
        width={size}
        height={size}
        rx={size / 5}
        fill={`url(#${color})`}
        stroke="black"
      />
    </svg>
  )
}

PlayerSwatch.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}

export default PlayerSwatch
