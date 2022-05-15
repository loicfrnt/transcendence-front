
import api from '../api/api';
const ROUTE = "/api/user-relationships/";

class UserRelationshipService {
    updateStatus(id:number, status: number)
    {
        return api.post(ROUTE + "update-status", {
            id: id,
            status: status
        }).then(response => {
            return response;
        });
    }

    delete(id: number) {
        return api.delete(ROUTE + id).then(response => {
            return response;
        });
    }
}

export default new UserRelationshipService();