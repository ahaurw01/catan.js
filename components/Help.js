import styles from './Help.module.css'
import Brick from './icons/Brick'
import Lumber from './icons/Lumber'
import Wool from './icons/Wool'
import Grain from './icons/Grain'
import Ore from './icons/Ore'
import { Divider } from 'react95/dist/prod'

const Help = () => (
  <div className={styles.help}>
    <h2>Building Costs</h2>
    <ul>
      <li>
        <span>Road (0 VP):</span> <Brick width={40} height={40} />{' '}
        <Lumber width={40} height={40} />
      </li>
      <li>
        <Divider />
      </li>
      <li>
        <span>Settlement (1 VP):</span> <Brick width={40} height={40} />{' '}
        <Lumber width={40} height={40} /> <Grain width={40} height={40} />{' '}
        <Wool width={40} height={40} />
      </li>
      <li>
        <Divider />
      </li>
      <li>
        <span>City (2 VP):</span> <Grain width={40} height={40} />{' '}
        <Grain width={40} height={40} /> <Ore width={40} height={40} />{' '}
        <Ore width={40} height={40} /> <Ore width={40} height={40} />
      </li>
      <li>
        <Divider />
      </li>
      <li>
        <span>Development Card:</span> <Wool width={40} height={40} />{' '}
        <Grain width={40} height={40} /> <Ore width={40} height={40} />
      </li>
    </ul>
  </div>
)

export default Help
