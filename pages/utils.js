import PropTypes from 'prop-types'

export const radius = 100

export const axialToCartesian = ({ q, r }) => ({
  x: radius * Math.sqrt(3) * (q + r / 2),
  y: radius * (3 / 2) * r,
})

/**
 * Take three axial points and convert to cartesian coordinates.
 */
export const axialVertexToCartesian = (vertex) => {
  const cartesianVertex = vertex.map(axialToCartesian)
  return {
    x:
      cartesianVertex.reduce((sum, { x }) => sum + x, 0) /
      cartesianVertex.length,
    y:
      cartesianVertex.reduce((sum, { y }) => sum + y, 0) /
      cartesianVertex.length,
  }
}

/**
 * Get the angle of the side between two hexagons.
 *
 * @param {Side} side  Two axial points.
 */
export const angleOfSide = (side) => {
  const cartesianPoints = side.map(axialToCartesian)
  const dx = cartesianPoints[1].x - cartesianPoints[0].x
  const dy = cartesianPoints[1].y - cartesianPoints[0].y
  const radiansOfVector = Math.atan(dy / dx)
  const perpendicularRadians = radiansOfVector + Math.PI / 2
  return (perpendicularRadians * 180) / Math.PI
}

const hexPointUnitVectors = [
  // Top
  {
    x: 0,
    y: -1,
  },
  // Right top
  {
    x: Math.sqrt(3) / 2,
    y: -1 / 2,
  },
  // Right bottom,
  {
    x: Math.sqrt(3) / 2,
    y: 1 / 2,
  },
  // Bottom
  {
    x: 0,
    y: 1,
  },
  // Left bottom
  {
    x: -Math.sqrt(3) / 2,
    y: 1 / 2,
  },
  // Left top
  {
    x: -Math.sqrt(3) / 2,
    y: -1 / 2,
  },
]

export const makeHexagonPoints = ({ x, y }) =>
  hexPointUnitVectors.map((u) => ({
    x: u.x * radius + x,
    y: u.y * radius + y,
  }))

export const axial = (q, r) => ({ q, r })

export const axialCoordinatePropType = PropTypes.shape({
  q: PropTypes.number,
  r: PropTypes.number,
})

function makeAxialPointsPropType(numPoints) {
  return function (props, propName, componentName) {
    const prop = props[propName]
    if (!Array.isArray(prop) || prop.length !== numPoints) {
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.'
      )
    }
    return prop.every((axialCoordinate) =>
      PropTypes.checkPropTypes(
        { axialCoordinate: axialCoordinatePropType },
        { axialCoordinate },
        'axialCoordinate',
        componentName
      )
    )
  }
}

export const vertexPropType = makeAxialPointsPropType(3)
export const sidePropType = makeAxialPointsPropType(2)
