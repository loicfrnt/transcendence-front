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
            gameHistory.unshift({
                oppenent: game.player2.user,
                scoreOppenent: game.player2.score!,
                scorePlayer: game.player1.score!,
                won: game.player1.score! > game.player2.score!,
                draw: false,
                created_at: new Date().toString(),
            });
        }else
        {
                gameHistory.unshift({
                    oppenent: game.player1.user,
                    scoreOppenent: game.player1.score!,
                    scorePlayer: game.player2.score!,
                    won: game.player2.score! > game.player1.score!,
                    draw: false,
                    created_at: new Date().toString(),
                });
        }
        if (game.status === GameStatus.ENDED)
        {
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 1))) { 
                if ((game.player2.user.id === user.id && game.player1.score! > game.player2.score!) ||
                (game.player1.user.id === user.id && game.player1.score! < game.player2.score!))
                {
                    await api.get(ROUTE + "acheivement/"+ 1).then(async (response) => {
                        if (response.data === '') {
                            await api.post(ROUTE, {
                                "acheivement_id": 1
                            });
                        }
                    })
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 2))) {
                if ((game.player2.user.id === user.id && game.player1.score! < game.player2.score!) ||
                (game.player1.user.id === user.id && game.player1.score! > game.player2.score!))
                {
                    await api.get(ROUTE + "acheivement/"+ 2).then(async (response) => {
                        if (response.data === '') {
                            await api.post(ROUTE, {
                                "acheivement_id": 2
                            });
                        }
                    })
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 3))) {
                let timesArow : boolean = true;
                if (gameHistory.length > 2) {
                    for (let i: number = 0; i < 3; i++)
                            if (gameHistory[i].won === false)
                                timesArow = false;
                } else {
                    timesArow = false
                }
                if (timesArow)
                {
                    await api.get(ROUTE + "acheivement/"+ 3).then(async (response) => {
                        if (response.data === '') {
                            await api.post(ROUTE, {
                                "acheivement_id": 3
                            });
                        }
                    })
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 4))) {
                const last = gameHistory[0];
                if (last && last.won && last?.scorePlayer === 5)
                {
                    await api.get(ROUTE + "acheivement/"+ 4).then(async (response) => {
                        if (response.data === '') {
                            await api.post(ROUTE, {
                                "acheivement_id": 4
                            });
                        }
                    })
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 5))) {
                if (game.playerHeight === GamePlayerHeight.SMALL)
                {
                    await api.get(ROUTE + "acheivement/"+ 5).then(async (response) => {
                        if (response.data === '') {
                            console.log("passed by")
                            await api.post(ROUTE, {
                                "acheivement_id": 5
                            });
                        }
                    })
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
                    await api.get(ROUTE + "acheivement/"+ 6).then(async (response) => {
                        if (response.data === '') {
                            await api.post(ROUTE, {
                                "acheivement_id": 6
                            });
                        }
                    })
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 7))) {
                const last = gameHistory[0];
                if (last && last.won && last?.scorePlayer === 10)
                {
                    await api.get(ROUTE + "acheivement/"+ 7).then(async (response) => {
                        if (response.data === '') {
                            await api.post(ROUTE, {
                                "acheivement_id": 7
                            });
                        }
                    })
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 8))) {
                let timesArow : boolean = true;
                if (gameHistory.length > 4) {
                    for (let i: number = 0; i < 5; i++)
                    {
                            if (gameHistory[i].won === false)
                                timesArow = false;
                    }
                } else {
                    timesArow = false
                }
                if (timesArow)
                {
                    await api.get(ROUTE + "acheivement/"+ 8).then(async (response) => {
                        if (response.data === '') {
                            await api.post(ROUTE, {
                                "acheivement_id": 8
                            });
                        }
                    })
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 9))) {
                const last = gameHistory[0];
                if (last && last.won && last?.scoreOppenent === 0)
                {
                    await api.get(ROUTE + "acheivement/"+ 9).then(async (response) => {
                        if (response.data === '') {
                            await api.post(ROUTE, {
                                "acheivement_id": 9
                            });
                        }
                    })
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 10))) {
                const last = gameHistory[0];
                if (last && last.won && game.ballSpeed === GameBallSpeed.FAST)
                {
                    await api.get(ROUTE + "acheivement/"+ 10).then(async (response) => {
                        if (response.data === '') {
                            await api.post(ROUTE, {
                                "acheivement_id": 10
                            });
                        }
                    })
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
                    await api.get(ROUTE + "acheivement/"+ 11).then(async (response) => {
                        if (response.data === '') {
                            await api.post(ROUTE, {
                                "acheivement_id": 11
                            });
                        }
                    })
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 12))) {
                let timesArow : boolean = true;
                if (gameHistory.length > 9) {
                    for (let i: number = 0; i < 10; i++)
                            if (gameHistory[i].won === false)
                                timesArow = false;
                } else {
                    timesArow = false
                }

                if (timesArow)
                {
                    await api.get(ROUTE + "acheivement/"+ 12).then(async (response) => {
                        if (response.data === '') {
                            await api.post(ROUTE, {
                                "acheivement_id": 12
                            });
                        }
                    })
                }
            }
            if (!user.acheivement_history || (user.acheivement_history && ! await user.acheivement_history.find(ah => ah.acheivement.id === 13))) {
                const last = gameHistory[0];
                if (last && last.won && last?.scorePlayer === 15)
                {
                    await api.get(ROUTE + "acheivement/"+ 13).then(async (response) => {
                        if (response.data === '') {
                            await api.post(ROUTE, {
                                "acheivement_id": 13
                            });
                        }
                    })
                }
            }
        }
    }
}

export default new AcheivementHistoriesService();
