export enum AcheivementType {
    BRONZE = 0,
    SILVER = 1,
    GOLD = 2
}

export enum AcheivementCategory {
    NULL = 0,
    WINS = 1,
    ON_ROW = 2,
    SMALL = 3,
    SCORE = 4,
    NO_SCORE = 5,
    FAST = 6
}

export  interface Acheivement {
    id : number,
    type: AcheivementType,
    category: AcheivementCategory,
    message: string
}