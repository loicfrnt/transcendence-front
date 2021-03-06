import api from '../api/api';
import axios from '../api/axios';
const ROUTE = "/api/users/";

class UsersService {
    checkIfEmailExists(email?: string) {
        return api.get(ROUTE + "intern/check_mail/" + email).then(response => {
            return response;
        });
    }

    checkIfUsernameExists(username?: string) {
        return api.get(ROUTE + "intern/check_username/" + username).then(response => {
            return response;
        });
    }

    checkIfEmailExistsExtern(email?: string) {
        return axios.get(ROUTE + "extern/check_mail/" + email).then(response => {
            return response;
        });
    }

    checkIfUsernameExistsExtern(username?: string) {
        return axios.get(ROUTE + "extern/check_username/" + username).then(response => {
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

    async getById(id: number) {
        return await api.get(ROUTE + id).then(response => {
            return response.data;
        });
    }

    getCurrent() {
        return api.get(ROUTE).then(response => {
            if (response.data.id)
                localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        });
    }

    getByUsername(username: string) {
        return api.get(ROUTE +"username/" + username).then(response => {
            return response.data;
        });
    }

    uploadFile(fd: FormData)
    {

      return api.post(ROUTE + 'avatar/', fd, {
          headers: {
              'Content-Type' : 'multipart/form-data'
          }
      });
    }
}

export default new UsersService();