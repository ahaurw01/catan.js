import PropTypes from 'prop-types'
import styles from './PlayersStuff.module.css'
import DevCard, { compare } from './DevCard'
import {
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableDataCell,
} from 'react95'

const PlayersStuff = ({ players, counts, resources }) => (
  <Table className={styles.table}>
    <TableHead>
      <TableRow head>
        <TableHeadCell style={{ width: '120px' }}>Player</TableHeadCell>
        <TableHeadCell style={{ width: '60px' }}>Goods</TableHeadCell>
        <TableHeadCell style={{ width: '80px' }}>Dev Cards</TableHeadCell>
        <TableHeadCell>Played Dev Cards</TableHeadCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {Object.entries(players).map(([color, name]) => (
        <TableRow key={color}>
          <TableDataCell>
            <div className={styles.ellipsis}>
              {color} - {name}
            </div>
          </TableDataCell>
          <TableDataCell style={{ textAlign: 'center' }}>
            {counts.resources[color] || 0}
          </TableDataCell>
          <TableDataCell style={{ textAlign: 'center' }}>
            {counts.devCardsInHand[color] || 0}
          </TableDataCell>
          <TableDataCell>
            <div className={styles.cards}>
              {resources[color].devCardsPlayed
                .slice()
                .sort(compare)
                .map((card, index) => (
                  <DevCard
                    key={`${card.type}${card.subType}${index}`}
                    {...card}
                    small
                  />
                ))}
            </div>
          </TableDataCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

PlayersStuff.propTypes = {
  players: PropTypes.shape({
    blue: PropTypes.string,
    red: PropTypes.string,
    white: PropTypes.string,
    green: PropTypes.string,
    orange: PropTypes.string,
  }),
  counts: PropTypes.shape({
    roads: PropTypes.shape({}),
    settlements: PropTypes.shape({}),
    cities: PropTypes.shape({}),
    devCardsInHand: PropTypes.shape({}),
    devCardsPlayed: PropTypes.shape({}),
    resources: PropTypes.shape({}),
  }),
  resources: PropTypes.shape({
    blue: PropTypes.shape({}),
    red: PropTypes.shape({}),
    white: PropTypes.shape({}),
    green: PropTypes.shape({}),
    orange: PropTypes.shape({}),
  }),
}

export default PlayersStuff
