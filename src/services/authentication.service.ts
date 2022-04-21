import axios from "axios";

const ROUTE = "/api/authentication/"

class AuthenticationService {
    login(email: string, password:string) {
        return axios.post(process.env.PUBLIC_URL + ROUTE + "log-in", {
            email,
            password
        }).then(response => {
            console.log(response);
            if (response.data.id) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
}

export default new AuthenticationService();