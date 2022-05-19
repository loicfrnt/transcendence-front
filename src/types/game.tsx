import { User } from './user'

export interface Duel {
  id: number
  sender: User
  receiver: User
}

export enum GameStatus {
  WAITING = 'waiting',
  INITIALIZATION = 'initialization',
  RUNNING = 'running',
  STOPPED = 'stopped',
  ENDED = 'ended',
}

export enum GameMaxPoints {
  FIVE = 5,
  TEN = 10,
  FIFTEEN = 15,
}

export enum GamePlayerHeight {
  SMALL = 50,
  MEDIUM = 100,
  LARGE = 150,
}

export enum GameBallSpeed {
  SLOW = 1.1,
  MEDIUM = 2,
  FAST = 2.5,
}
interface PlayerInterface {
  id: string
  user: User
  isReady: boolean
  timer?: Date
  x?: number
  y?: number
  score?: number
}

interface BallInterface {
  x: number
  y: number
  r: number
  speed: {
    x: number
    y: number
  }
}

export default interface Game {
  id: string
  status: GameStatus
  canvasHeight: number
  canvasWidth: number
  maxPoints: GameMaxPoints
  ballSpeed: GameBallSpeed
  playerHeight: GamePlayerHeight
  playerWidth: number
  player1: PlayerInterface
  player2: PlayerInterface
  ball: BallInterface
}
