import axios from "axios";
//import useAxiosPrivate from "../hooks/use-axios-private";
import api from '../api/api';
const ROUTE = "/api/users/";

class UsersService {
    //const axiosPrivate = useAxiosPrivate();
    checkIfEmailExists(email?: string) {
        return api.get(ROUTE + "check_mail/" + email).then(response => {
            return response;
        });
    }

    checkIfUsernameExists(username?: string) {
        return api.get(ROUTE + "check_username/" + username).then(response => {
            return response;
        });
    }

    update(username:string, email: string, password:string) {
        return api.patch(ROUTE, {
            username,
            email,
            password
        }).then((response) => {
            if (response.data.id) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
}

export default new UsersService();