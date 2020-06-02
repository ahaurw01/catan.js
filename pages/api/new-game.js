import { makeNewGame } from '../../server/game'

export default function (req, res) {
  if (req.method !== 'POST') {
    res.status = 405
    return
  }

  res.statusCode = 201
  res.json({ id: makeNewGame() })
}
