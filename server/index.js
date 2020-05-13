const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const SocketIO = require('socket.io')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const { wireItUp } = require('./game')

nextApp.prepare().then(() => {
  const http = createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      nextApp.render(req, res, '/b', query)
    } else if (pathname === '/b') {
      nextApp.render(req, res, '/a', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })

  wireItUp(SocketIO(http))
})
