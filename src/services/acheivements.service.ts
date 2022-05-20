import api from "../api/api";
import { acheivementsList } from "../data/acheivements"

const ROUTE = "/api/acheivements/"

class AcheivementsService {
    load() {
        api.get(ROUTE).then(response => {
            if (!response)
            {
                api.post(ROUTE, acheivementsList).then(response => {
                    return response;
                })
            }
        });
    }
}

export default new AcheivementsService();