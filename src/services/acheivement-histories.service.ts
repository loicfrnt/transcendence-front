import api from '../api/api';
import Game, { GameBallSpeed, GamePlayerHeight } from '../types/game'
import { GameStatus } from '../types/game'
import { GameHistory, User } from '../types/user';
import gameService from './game.service';

const ROUTE = "/api/acheivements-histories/"

class AcheivementHistoriesService {
    async processAcheivements(game: Game, user: User) {
        let gameHistory: GameHistory[] = gameService.getGameHistory(user);
        if (game.player1.user.id === user.id){
            gameHistory.push({
                oppenent: game.player2.user,
                scoreOppenent: game.player2.score!,
                scorePlayer: game.player1.score!,
                won: game.player1.score! > game.player2.score!,
                created_at: new Date().toString(),
            });
        }else
        {
                gameHistory.push({
                    oppenent: game.player1.user,
                    scoreOppenent: game.player1.score!,
                    scorePlayer: game.player2.score!,
                    won: game.player2.score! > game.player1.score!,
                    created_at: new Date().toString(),
                });
        }
        if (game.status === GameStatus.ENDED)
        {
            console.log(user.acheivement_history)
            console.log( await user.acheivement_history.find(ah => ah.acheivement.id === 1));
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 1))) { 
                if ((game.player2.user.id === user.id && game.player1.score! > game.player2.score!) ||
                (game.player1.user.id === user.id && game.player1.score! < game.player2.score!))
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 1
                    });
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 2))) {
                if ((game.player2.user.id === user.id && game.player1.score! < game.player2.score!) ||
                (game.player1.user.id === user.id && game.player1.score! > game.player2.score!))
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 2
                    });
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 3))) {
                let timesArow : boolean = true;
                if (gameHistory.length > 2) {
                    for (let i: number = gameHistory.length - 1; i >= gameHistory.length - 3; i--)
                            if (gameHistory[i].won === false)
                                timesArow = false;
                } else {
                    timesArow = false
                }
                if (timesArow)
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 3
                    });
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 4))) {
                const last = gameHistory[gameHistory.length - 1];
                if (last && last.won && last?.scorePlayer === 5)
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 4
                    });
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 5))) {
                if (game.playerHeight === GamePlayerHeight.SMALL)
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 5
                    });
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 6))) {
                let wins : number = 0;
                if (gameHistory.length > 9)
                    for (let i: number = gameHistory.length - 1; i >= 0; i--)
                            if (gameHistory[i].won === true)
                                wins++;
                if (wins >= 10)
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 6
                    });
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 7))) {
                const last = gameHistory[gameHistory.length - 1];
                if (last && last.won && last?.scorePlayer === 10)
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 7
                    });
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 8))) {
                let timesArow : boolean = true;
                if (gameHistory.length > 4) {
                    for (let i: number = gameHistory.length - 1; i >= gameHistory.length - 5; i--)
                            if (gameHistory[i].won === false)
                                timesArow = false;
                } else {
                    timesArow = false
                }
                if (timesArow)
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 8
                    });
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 9))) {
                const last = gameHistory[gameHistory.length - 1];
                if (last && last.won && last?.scoreOppenent === 0)
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 9
                    });
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 10))) {
                const last = gameHistory[gameHistory.length - 1];
                if (last && last.won && game.ballSpeed === GameBallSpeed.FAST)
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 10
                    });
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 11))) {
                let wins : number = 0;
                if (gameHistory.length > 49)
                    for (let i: number = gameHistory.length - 1; i >= 0; i--)
                            if (gameHistory[i].won === true)
                                wins++;
                if (wins >= 50)
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 11
                    });
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 12))) {
                let timesArow : boolean = true;
                if (gameHistory.length > 9) {
                    for (let i: number = gameHistory.length - 1; i >= gameHistory.length - 10; i--)
                            if (gameHistory[i].won === false)
                                timesArow = false;
                } else {
                    timesArow = false
                }

                if (timesArow)
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 12
                    });
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 13))) {
                const last = gameHistory[gameHistory.length - 1];
                if (last && last.won && last?.scorePlayer === 15)
                {
                    await api.post(ROUTE, {
                        "acheivement_id": 13
                    });
                }
            }
        }
    }
}

export default new AcheivementHistoriesService();
