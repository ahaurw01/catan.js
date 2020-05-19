import styles from './Board.module.css'

const Board = ({ children }) => (
  <svg viewBox="-500 -500 1000 1000" className={styles.board}>
    <defs>
      <pattern
        id="brick"
        patternUnits="userSpaceOnUse"
        width="1068"
        height="634"
        patternTransform="scale(0.3)"
      >
        <image
          xlinkHref="img/brick.png"
          x="0"
          y="0"
          width="1068"
          height="634"
        />
      </pattern>
      <pattern id="ore" x="0" y="0" width="1" height="1">
        <image xlinkHref="img/ore.png" width="320" height="250" />
      </pattern>

      {/*
         <pattern
           id="ore"
           patternUnits="userSpaceOnUse"
           width="964"
           height="754"
           patternTransform="scale(0.4)"
         >
           <image xlinkHref="img/ore.png" x="0" y="0" width="964" height="754" />
         </pattern>
        */}

      <pattern id="forest" x="0" y="0" width="1" height="1">
        <image xlinkHref="img/forest.png" width="380" height="332" />
      </pattern>
      <pattern
        id="forest2"
        patternUnits="userSpaceOnUse"
        width="218"
        height="240"
        patternTransform="scale(0.6)"
      >
        <image
          xlinkHref="img/forest2.png"
          x="0"
          y="0"
          width="218"
          height="240"
        />
      </pattern>
      <pattern
        id="desert"
        patternUnits="userSpaceOnUse"
        width="918"
        height="712"
        patternTransform="scale(0.3)"
      >
        <image
          xlinkHref="img/desert.png"
          x="0"
          y="0"
          width="918"
          height="712"
        />
      </pattern>
      <pattern id="pasture" x="0" y="0" width="1" height="1">
        <image xlinkHref="img/pasture.png" width="452" height="306" />
      </pattern>
      <pattern id="minsweeper" x="0" y="0" width="1" height="1">
        <image xlinkHref="img/minsweeper.png" width="261" height="250" />
      </pattern>
    </defs>
    {children}
  </svg>
)

export default Board
