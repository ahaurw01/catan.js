import { games } from '../../server/game'

export default function (req, res) {
  res.statusCode = 200
  res.json({ games: Object.entries(games).map(([id, game]) => ({ id })) })
}
