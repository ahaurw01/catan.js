const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const SocketIO = require('socket.io')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const { wireItUp, makeNewGame, games } = require('./game')

nextApp.prepare().then(() => {
  const http = createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    if (parsedUrl.pathname === '/api/get-games') {
      res.end(
        JSON.stringify({
          games: Object.entries(games).map(([id, game]) => ({
            id,
            createdAt: game.createdAt,
            players: game.players,
          })),
        })
      )
      return
    } else if (parsedUrl.pathname === '/api/new-game') {
      res.end(JSON.stringify({ id: makeNewGame() }))
      return
    }

    handle(req, res, parsedUrl)
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log('> Ready!')
  })

  wireItUp(SocketIO(http))
})
