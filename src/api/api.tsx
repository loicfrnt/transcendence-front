import { axiosPrivate } from "../api/axios";
const instance = axiosPrivate;
let isRefreshing = false;
instance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    if (!isRefreshing)
                    {
                        isRefreshing = true;
                        prevRequest.sent = true;
                        await instance.get('/api/authentication/refresh', {
                                withCredentials: true
                            }).then((response) => {
                                localStorage.setItem("user", JSON.stringify(response.data));
                                isRefreshing = false;
                            }).catch((err) => {

                            });
                        }
                    return instance(prevRequest);
                }
                return Promise.reject(error);
            }
);
export default instance;