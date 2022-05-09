import axios from "axios";

const ROUTE = "/api/users/";

class UsersService {
    checkIfEmailExists(email?: string) {
        return axios.get(process.env.PUBLIC_URL + ROUTE + "check_mail/" + email, {withCredentials: true}).then(response => {
            return response;
        });
    }

    checkIfUsernameExists(username?: string) {
        return axios.get(process.env.PUBLIC_URL + ROUTE + "check_username/" + username, {withCredentials: true}).then(response => {
            return response;
        });
    }

    update(username:string, email: string, password:string) {
        return axios.patch(process.env.PUBLIC_URL + ROUTE, {
            username,
            email,
            password
        }, {withCredentials: true}).then((response) => {
            if (response.data.id) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
}

export default new UsersService();