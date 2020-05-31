import PropTypes from 'prop-types'
import styles from './PlayersStuff.module.css'
import DevCard, { compare } from './DevCard'
import PlayerSwatch from './PlayerSwatch'
import {
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableDataCell,
} from 'react95'

const PlayersStuff = ({
  players,
  counts,
  resources,
  longestRoad,
  largestArmy,
}) => (
  <Table className={styles.table}>
    <TableHead>
      <TableRow head>
        <TableHeadCell style={{ width: '120px' }}>Player</TableHeadCell>
        <TableHeadCell style={{ width: '45px' }}>Goods</TableHeadCell>
        <TableHeadCell style={{ width: '80px' }}>Settlements</TableHeadCell>
        <TableHeadCell style={{ width: '40px' }}>Cities</TableHeadCell>
        <TableHeadCell style={{ width: '60px' }}>Longest Road?</TableHeadCell>
        <TableHeadCell style={{ width: '60px' }}>Largest Army?</TableHeadCell>
        <TableHeadCell style={{ width: '45px' }}>Dev Cards</TableHeadCell>
        <TableHeadCell>Played Dev Cards</TableHeadCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {Object.entries(players).map(([color, name]) => (
        <TableRow key={color}>
          <TableDataCell>
            <div className={styles.ellipsis}>
              <PlayerSwatch color={color} size={25} />
              <span>
                &nbsp;&nbsp;
                {name}
              </span>
            </div>
          </TableDataCell>
          <TableDataCell>{counts.resources[color] || 0}</TableDataCell>
          <TableDataCell>{counts.settlements[color] || 0}</TableDataCell>
          <TableDataCell>{counts.cities[color] || 0}</TableDataCell>
          <TableDataCell>{color === longestRoad && '✔'}</TableDataCell>
          <TableDataCell>{color === largestArmy && '✔'}</TableDataCell>
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
  longestRoad: PropTypes.oneOf([
    'blue',
    'red',
    'white',
    'green',
    'orange',
    null,
  ]),
  largestArmy: PropTypes.oneOf([
    'blue',
    'red',
    'white',
    'green',
    'orange',
    null,
  ]),
}

export default PlayersStuff
