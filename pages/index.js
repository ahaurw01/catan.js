import Head from 'next/head'
import Board from './components/Board'
import Tile from './components/Tile'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Catan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Board>
          <Tile type="desert" q={0} r={-2} dieNumber={1} />
          <Tile type="desert" q={1} r={-2} dieNumber={2} />
          <Tile type="desert" q={2} r={-2} dieNumber={3} />

          <Tile type="desert" q={-1} r={-1} dieNumber={6} />
          <Tile type="desert" q={0} r={-1} dieNumber={8} />
          <Tile type="desert" q={1} r={-1} dieNumber={8} />
          <Tile type="desert" q={2} r={-1} dieNumber={8} />

          <Tile type="desert" q={-2} r={0} dieNumber={8} />
          <Tile type="desert" q={-1} r={0} dieNumber={8} />
          <Tile type="desert" q={0} r={0} dieNumber={8} />
          <Tile type="desert" q={1} r={0} dieNumber={8} />
          <Tile type="desert" q={2} r={0} dieNumber={8} />

          <Tile type="desert" q={-2} r={1} dieNumber={8} />
          <Tile type="desert" q={-1} r={1} dieNumber={8} />
          <Tile type="desert" q={0} r={1} dieNumber={8} />
          <Tile type="desert" q={1} r={1} dieNumber={8} />

          <Tile type="desert" q={-2} r={2} dieNumber={8} />
          <Tile type="desert" q={-1} r={2} dieNumber={8} />
          <Tile type="desert" q={0} r={2} dieNumber={8} />
        </Board>
      </main>
    </div>
  )
}
