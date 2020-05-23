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
        <TableHeadCell style={{ textAlign: 'left', width: '120px' }}>
          Player
        </TableHeadCell>
        <TableHeadCell style={{ textAlign: 'left', width: '60px' }}>
          Goods
        </TableHeadCell>
        <TableHeadCell style={{ textAlign: 'left', width: '80px' }}>
          Settlements
        </TableHeadCell>
        <TableHeadCell style={{ textAlign: 'left', width: '60px' }}>
          Cities
        </TableHeadCell>
        <TableHeadCell style={{ textAlign: 'left', width: '80px' }}>
          Dev Cards
        </TableHeadCell>
        <TableHeadCell style={{ textAlign: 'left' }}>
          Played Dev Cards
        </TableHeadCell>
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
          <TableDataCell>{counts.resources[color] || 0}</TableDataCell>
          <TableDataCell>{counts.settlements[color] || 0}</TableDataCell>
          <TableDataCell>{counts.cities[color] || 0}</TableDataCell>
          <TableDataCell>{counts.devCardsInHand[color] || 0}</TableDataCell>
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
