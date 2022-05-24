import axios, { axiosPrivate } from "../api/axios";
import authenticationService from "../services/authentication.service"
import history from "../lib/history"
const instance = axiosPrivate;

instance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    await axios.get('/api/authentication/refresh', {
                            withCredentials: true
                        }).then((response) => {
                            localStorage.setItem("user", JSON.stringify(response.data));
                            return instance(prevRequest);
                        }).catch((err)  => {
                            if (err?.response?.status === 401)
                            {
                                localStorage.setItem("connected", JSON.stringify(false));
                                authenticationService.logout();
                                history.push('/');
                            }
                        });
                }
                return Promise.reject(error);
            }
);
export default instance;