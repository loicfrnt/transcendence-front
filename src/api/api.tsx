import { axiosPrivate } from "../api/axios";
const instance = axiosPrivate;
instance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const userResponse = await instance.get('/api/authentication/refresh', {
                            withCredentials: true
                        });
                    localStorage.setItem("user", JSON.stringify(userResponse.data));
                    return instance(prevRequest);
                }
                return Promise.reject(error);
            }
);
export default instance;