import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './GameResources.module.css'
import { Button, Divider, Fieldset } from 'react95'
import Good from './Good'
import DevCard from './DevCard'
import cx from 'classnames'
import GiveRandomModal from './GiveRandomModal'

const GOOD_NAMES = ['lumber', 'grain', 'brick', 'ore', 'wool']

const GameResources = ({
  player,
  goods,
  players,
  bankGoods,
  onChangeGood,
  devCardsInHand,
  devCardsPlayed,
  bankDevCards,
  onTakeDevCard,
  onPlayDevCard,
  onUndoPlayDevCard,
  onGiveRandom,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const canGiveRandom =
    !!player &&
    !!goods &&
    Object.keys(players).length > 1 &&
    GOOD_NAMES.reduce((sum, good) => sum + (goods[good] || 0), 0) > 0
  return (
    <>
      {player && goods && (
        <>
          <GiveRandomModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            players={Object.entries(players)
              .filter(([color]) => color !== player)
              .reduce(
                (players, [color, name]) => ({ ...players, [color]: name }),
                {}
              )}
            onGiveRandom={(color) => {
              setIsModalOpen(false)
              onGiveRandom(color)
            }}
          />
          <div className={styles.fieldsetWrapper}>
            <Fieldset label="Goods">
              <Button
                className={styles.giveRandom}
                size="sm"
                onClick={() => setIsModalOpen(true)}
                disabled={!canGiveRandom}
              >
                Give Random...
              </Button>
              <div className={styles.goods}>
                {GOOD_NAMES.map((good, index, all) => (
                  <div key={good} className={styles.goodSection}>
                    <Good
                      key={good}
                      type={good}
                      count={goods[good]}
                      moreInBank={bankGoods[good] > 0}
                      onChange={(diff) => onChangeGood({ good, diff })}
                    />
                    <Divider vertical className={styles.divider} />
                  </div>
                ))}
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
                      .map((card, index) => [card, index])
                      .reverse()
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
                        .map((card, index) => [card, index])
                        .reverse()
                        .map(([card, index]) => (
                          <DevCard
                            key={Math.random()}
                            {...card}
                            played
                            onUndoPlay={() => onUndoPlayDevCard(index)}
                          />
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
  players: PropTypes.shape({
    red: PropTypes.string,
    blue: PropTypes.string,
    white: PropTypes.string,
    green: PropTypes.string,
    orange: PropTypes.string,
  }),
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
  onUndoPlayDevCard: PropTypes.func.isRequired,
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
