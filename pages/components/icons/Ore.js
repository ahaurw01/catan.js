import PropTypes from 'prop-types'

const Ore = ({ width, height }) => (
  <svg width={width} height={height} viewBox="0 0 112.5 112.5">
    <rect
      x="62.786"
      y="23.484"
      transform="matrix(0.6636 0.7481 -0.7481 0.6636 42.479 -43.2366)"
      width="13.048"
      height="4.253"
    />
    <path d="M89.43,31L72.513,11H40.189L27.865,26H14.91L0.351,43L14.91,60h27.532l7.708-9h22.364L89.43,31z M40.601,56H16.75  l-6.356-7.422l12.34-14.59l-3.246-2.746L7.593,45.307L5.618,43L16.75,30h23.85l11.134,13L40.601,56z M53.574,47L57,43L42.441,26  h-9.4l9.038-11h28.578l13.534,16L70.657,47H53.574z" />
    <path d="M76.291,59H56.776L46.147,71l10.629,12h19.515l10.628-12L76.291,59z M74.49,79H58.577l-7.086-8l7.086-8H74.49l3.542,4H68v4  h13.575L74.49,79z" />
  </svg>
)

Ore.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default Ore
