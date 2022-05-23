import { GameHistory, User } from "../types/user"

class GameService {
    getGameHistory(user: User) {
        let newHist: GameHistory[] = []
        user.gamesAsPlayer1.forEach((game) => {
          newHist.push({
            oppenent: game.player2,
            scoreOppenent: game.player2Points as number,
            scorePlayer: game.player1Points as number,
            won: game.player1Points >= game.player2Points,
            draw: game.endGameStatus === 'abort',
            created_at: game.created_at,
          })
        })
        user.gamesAsPlayer2.forEach((game) => {
          newHist.push({
            oppenent: game.player1,
            scoreOppenent: game.player1Points as number,
            scorePlayer: game.player2Points as number,
            won: game.player2Points >= game.player1Points,
            draw: game.endGameStatus === 'abort',
            created_at: game.created_at,
          })
        })
        newHist.sort((a, b) => {
          let d1 = Date.parse(a.created_at)
          let d2 = Date.parse(b.created_at)
          return d2 - d1
        })
        return newHist;
    }
};

export default new GameService();