import PropTypes from 'prop-types'
import styles from './GameResources.module.css'
import { Button, Divider, Fieldset } from 'react95'
import Good from './Good'
import DevCard from './DevCard'
import cx from 'classnames'

const GameResources = ({
  player,
  goods,
  bankGoods,
  onChangeGood,
  devCardsInHand,
  devCardsPlayed,
  bankDevCards,
  onTakeDevCard,
  onPlayDevCard,
}) => {
  return (
    <>
      {player && goods && (
        <>
          <div className={styles.fieldsetWrapper}>
            <Fieldset label="Goods">
              <div className={styles.goods}>
                {['lumber', 'grain', 'brick', 'ore', 'wool'].map(
                  (good, index, all) => (
                    <div key={good} className={styles.goodSection}>
                      <Good
                        key={good}
                        type={good}
                        count={goods[good]}
                        moreInBank={bankGoods[good] > 0}
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
          </div>
          <div className={styles.fieldsetWrapper}>
            <Fieldset label="Development Cards">
              <div className={styles.cardsWrapper}>
                <div className={styles.cardsInHand}>
                  <div className={styles.spacer} />
                  <Button
                    disabled={bankDevCards.length === 0}
                    onClick={onTakeDevCard}
                    size="sm"
                    className={cx(styles.takeDevCard, {
                      [styles.rotated]: devCardsInHand.length > 0,
                    })}
                  >
                    Take Dev Card
                  </Button>

                  <div className={styles.cardsWithButton}>
                    {devCardsInHand
                      .slice()
                      .reverse()
                      .map((card, index) => [card, index])
                      .map(([card, index]) => (
                        <DevCard
                          key={Math.random()}
                          {...card}
                          onPlay={() => onPlayDevCard(index)}
                        />
                      ))}
                  </div>
                </div>

                {devCardsPlayed.length > 0 && (
                  <div className={styles.playedCards}>
                    <div className={styles.cardsWithDivider}>
                      <Divider vertical size="lg" />
                      {devCardsPlayed
                        .slice()
                        .reverse()
                        .map((card) => (
                          <DevCard key={Math.random()} {...card} played />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </Fieldset>
          </div>
        </>
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
  bankGoods: PropTypes.shape({
    lumber: PropTypes.number,
    grain: PropTypes.number,
    brick: PropTypes.number,
    ore: PropTypes.number,
    wool: PropTypes.number,
  }),
  onChangeGood: PropTypes.func.isRequired,
  devCardsInHand: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      subType: PropTypes.string,
    })
  ),
  devCardsPlayed: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      subType: PropTypes.string,
    })
  ),
  bankDevCards: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      subType: PropTypes.string,
    })
  ),
  onTakeDevCard: PropTypes.func.isRequired,
  onPlayDevCard: PropTypes.func.isRequired,
}

GameResources.defaultProps = {
  player: null,
  goods: null,
  bankGoods: null,
  devCardsInHand: [],
  devCardsPlayed: [],
  bankDevCards: [],
}

export default GameResources
