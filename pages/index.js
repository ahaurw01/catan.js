import { useEffect, useState } from 'react'
import Head from 'next/head'
import moment from 'moment'
import Router, { useRouter } from 'next/router'
import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableDataCell,
} from 'react95'
import styles from './index.module.css'

export default function Index() {
  const [games, setGames] = useState([])
  useEffect(() => {
    fetch('/api/get-games')
      .then((res) => res.json())
      .then(({ games }) => setGames(games))
  }, [])

  const createNewGame = () => {
    fetch('/api/new-game')
      .then((res) => res.json())
      .then(({ id }) => Router.push('/game/[id]', `/game/${id}`))
  }

  return (
    <div className="container">
      <Head>
        <title>Settlers.exe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Window className={styles.mainWindow}>
        <WindowHeader className={styles.windowHeader}>
          <span className={styles.noPointerEvents}>
            <span className={styles.icon}>🌄</span>C:\Games\Settlers.exe
          </span>
        </WindowHeader>
        <WindowContent className={styles.windowContent}>
          <div className={styles.layout}>
            <div className={styles.newGame}>
              <Button onClick={createNewGame}>New Game</Button>
            </div>
            <Table className={styles.table}>
              <TableHead>
                <TableRow head>
                  <TableHeadCell>Players</TableHeadCell>
                  <TableHeadCell>Created</TableHeadCell>
                  <TableHeadCell></TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {games.map(({ id, players, createdAt }) => (
                  <TableRow key={id}>
                    <TableDataCell>
                      {Object.entries(players)
                        .map(([color, name]) => name)
                        .join(', ')}
                    </TableDataCell>
                    <TableDataCell>{moment(createdAt).fromNow()}</TableDataCell>
                    <TableDataCell style={{ textAlign: 'center' }}>
                      <Button
                        onClick={() => Router.push('/game/[id]', `/game/${id}`)}
                      >
                        Join
                      </Button>
                    </TableDataCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </WindowContent>
      </Window>
    </div>
  )
}
