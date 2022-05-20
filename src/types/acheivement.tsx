export enum AcheivementType {
    BRONZE = 0,
    SILVER = 1,
    GOLD = 2
}

export  interface Acheivement {
    id : number,
    type: AcheivementType,
    message: string
}