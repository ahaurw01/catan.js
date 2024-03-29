const SvgDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <pattern
        id="blue"
        patternUnits="userSpaceOnUse"
        width="20"
        height="20"
        patternTransform="scale(0.9)"
      >
        <rect x="0" y="0" width="20" height="20" fill="blue" />
        <g fill="white" fillOpacity="1" fillRule="evenodd">
          <circle cx="3" cy="3" r="3" />
          <circle cx="13" cy="13" r="3" />
        </g>
      </pattern>

      <pattern id="white" patternUnits="userSpaceOnUse" width="20" height="20">
        <rect x="0" y="0" width="20" height="20" fill="white" />
      </pattern>

      <pattern
        id="green"
        patternUnits="userSpaceOnUse"
        width="40"
        height="40"
        patternTransform="scale(0.5)"
      >
        <rect x="0" y="0" width="40" height="40" fill="green" />
        <path fill="white" d="M0 40L40 0H20L0 20M40 40V20L20 40" />
      </pattern>

      <pattern
        id="orange"
        patternUnits="userSpaceOnUse"
        width="8"
        height="8"
        patternTransform="scale(2)"
      >
        <rect x="0" y="0" width="8" height="8" fill="darkorange" />
        <path fill="white" d="M0 0h4v4H0V0zm4 4h4v4H4V4z" />
      </pattern>

      <pattern
        id="red"
        patternUnits="userSpaceOnUse"
        width="64"
        height="60"
        patternTransform="translate(20, 20) scale(0.4)"
      >
        <rect x="0" y="0" width="64" height="60" fill="red" />
        <path
          fill="white"
          d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
        />
        <g transform="translate(32, 30)">
          <path
            fill="white"
            d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
          />
        </g>
      </pattern>

      <pattern id="clear" patternUnits="userSpaceOnUse" width="20" height="20">
        <rect x="0" y="0" width="20" height="20" fill="rgba(255,255,255,0.5)" />
      </pattern>
    </defs>
  </svg>
)

export default SvgDefs
