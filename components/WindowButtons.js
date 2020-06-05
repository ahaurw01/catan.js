import styles from './WindowButtons.module.css'
import { Button } from 'react95'

export default function WindowButtons({ children }) {
  return <div className={styles.windowHeaderButtons}>{children}</div>
}

export function CloseButton(props) {
  return (
    <Button size="sm" square {...props}>
      <div className={styles.close} />
    </Button>
  )
}

export function MinimizeButton(props) {
  return (
    <Button size="sm" square {...props}>
      <div className={styles.minimize} />
    </Button>
  )
}

export function MaximizeButton(props) {
  return (
    <Button size="sm" square {...props}>
      <div className={styles.maximize} />
    </Button>
  )
}
