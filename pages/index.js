import { useEffect, useState } from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'

export default function Index() {
  const [games, setGames] = useState([])
  useEffect(() => {
    fetch('/api/get-games')
      .then((res) => res.json())
      .then(({ games }) => setGames(games))
  })

  return (
    <div className="container">
      <Head>
        <title>Settlers.exe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>games: {JSON.stringify(games)}</main>
    </div>
  )
}
