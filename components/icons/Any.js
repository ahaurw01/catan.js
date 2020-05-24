import PropTypes from 'prop-types'

const Any = ({ width, height }) => (
  <svg width={width} height={height} viewBox="0 0 512 512">
    <text x="160" y="470" fontSize="450">
      ?
    </text>
  </svg>
)

Any.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default Any
