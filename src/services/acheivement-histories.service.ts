import { appendFile } from 'fs';
import api from '../api/api';
import Game from '../types/game'
import { GameStatus } from '../types/game'
import { User } from '../types/user';

const ROUTE = "/api/acheivements-histories/"

class AcheivementHistoriesService {
    async processAcheivements(game: Game, user: User) {
        if (game.status === GameStatus.ENDED)
        {
            if (!user.acheivements_history.find(ah => ah.acheivement.id === 1)) {
                if (game.player1.score === game.player2.score)
                {
                    await api.post(ROUTE + {
                        "acheivement_id": 1
                    });
                }
            }
            if (!user.acheivements_history.find(ah => ah.acheivement.id === 2)) {
                if ((game.player2.user.id === user.id && game.player1.score! > game.player2.score!) ||
                (game.player1.user.id === user.id && game.player1.score! < game.player2.score!))
                {
                    await api.post(ROUTE + {
                        "acheivement_id": 2
                    });
                }
            }
            if (!user.acheivements_history.find(ah => ah.acheivement.id === 4)) {
                if ((game.player2.user.id === user.id && game.player1.score! > game.player2.score!) ||
                (game.player1.user.id === user.id && game.player1.score! < game.player2.score!))
                {
                    await api.post(ROUTE + {
                        "acheivement_id": 4
                    });
                }
            }
        }
    }
}

export default new AcheivementHistoriesService();