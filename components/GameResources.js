import PropTypes from 'prop-types'
import styles from './GameResources.module.css'
import { Divider, Fieldset } from 'react95'
import Good from './Good'

const GameResources = ({ player, goods, onChangeGood }) => {
  return (
    <>
      {player && goods && (
        <Fieldset label="Goods">
          <div className={styles.goods}>
            {['lumber', 'grain', 'brick', 'ore', 'wool'].map(
              (good, index, all) => (
                <div key={good} className={styles.goodSection}>
                  <Good
                    key={good}
                    type={good}
                    count={goods[good]}
                    onChange={(diff) => onChangeGood({ good, diff })}
                  />
                  {index !== all.length - 1 && (
                    <Divider vertical className={styles.divider} />
                  )}
                </div>
              )
            )}
          </div>
        </Fieldset>
      )}
    </>
  )
}

GameResources.propTypes = {
  player: PropTypes.string,
  goods: PropTypes.shape({
    lumber: PropTypes.number,
    grain: PropTypes.number,
    brick: PropTypes.number,
    ore: PropTypes.number,
    wool: PropTypes.number,
  }),
  onChangeGood: PropTypes.func.isRequired,
}

GameResources.defaultProps = {
  player: null,
  goods: null,
}

export default GameResources
