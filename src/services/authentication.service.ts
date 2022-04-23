import axios from "axios";

const ROUTE = "/api/authentication/"

class AuthenticationService {
    login(username: string, password:string) {
        return axios.post(process.env.PUBLIC_URL + ROUTE + "log-in", {
            username,
            password
        }).then(response => {
            if (response.data.id) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    register(username: string, email: string, password:string) {
        return axios.post(process.env.PUBLIC_URL + ROUTE + "register", {
            username,
            email,
            password
        }).then(response =>{
            return response.data;
        });
    }
}

export default new AuthenticationService();