import { Acheivement, AcheivementCategory, AcheivementType } from "../types/acheivement";

export const acheivementsList: Acheivement[] = [
    {
        id: 1,
        type: AcheivementType.BRONZE,
        category: AcheivementCategory.NULL,
        message: " First defeat!"
    },
    {
        id: 2,
        type: AcheivementType.BRONZE,
        category: AcheivementCategory.WINS,
        message: "First win!"
    },
    {
        id: 3,
        type: AcheivementType.BRONZE,
        category: AcheivementCategory.ON_ROW,
        message: "Win 3 times in a row"
    },
    {
        id: 4,
        type: AcheivementType.BRONZE,
        category: AcheivementCategory.SCORE,
        message: "Win with a score of 5"
    },
    {
        id: 5,
        type: AcheivementType.BRONZE,
        category: AcheivementCategory.SMALL,
        message: "Small size master!"
    },
    {
        id: 6,
        type: AcheivementType.SILVER,
        category: AcheivementCategory.WINS,
        message: "Win 10 times!"
    },
    {
        id: 7,
        type: AcheivementType.SILVER,
        category: AcheivementCategory.SCORE,
        message: "Win with a score of 10"
    },
    {
        id: 8,
        type: AcheivementType.SILVER,
        category: AcheivementCategory.ON_ROW,
        message: "Win 5 times in a row!"
    },
    {
        id: 9,
        type: AcheivementType.SILVER,
        category: AcheivementCategory.NO_SCORE,
        message: "Win without letting the opponent score!"
    },
    {
        id: 10,
        type: AcheivementType.SILVER,
        category: AcheivementCategory.FAST,
        message: "Win with a fast ball speed!"
    },
    {
        id: 11,
        type: AcheivementType.GOLD,
        category: AcheivementCategory.WINS,
        message: "Win 50 times!"
    },
    {
        id: 12,
        type: AcheivementType.GOLD,
        category: AcheivementCategory.ON_ROW,
        message: "Win 10 times in a row!"
    },
    {
        id: 13,
        type: AcheivementType.GOLD,
        category: AcheivementCategory.SCORE,
        message: "Win with a score of 15!"
    }
]