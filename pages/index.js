import Head from 'next/head'
import Board from './components/Board'
import Tile from './components/Tile'
import Building from './components/Building'
import { axial } from './utils'
import Road from './components/Road'
import Port from './components/Port'

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
          <Tile type="desert" q={1} r={-1} dieNumber={12} />
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

          <Building
            vertex={[axial(0, 0), axial(1, 0), axial(0, 1)]}
            color="orange"
            type="settlement"
          />
          <Building
            vertex={[axial(1, 1), axial(0, 1), axial(0, 2)]}
            color="orange"
            type="city"
          />

          <Road color="orange" side={[axial(-1, -1), axial(-1, 0)]} />
          <Road color="red" side={[axial(0, 0), axial(0, -1)]} />

          <Port
            side={[axial(-1, -1), axial(-2, -1)]}
            goods="lumber"
            ratio={2}
          />
          <Port side={[axial(-1, 3), axial(-1, 2)]} goods="any" ratio={3} />
        </Board>
      </main>
    </div>
  )
}
