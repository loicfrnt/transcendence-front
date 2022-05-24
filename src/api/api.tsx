import axios, { axiosAuth, axiosPrivate } from "../api/axios";
import authenticationService from "../services/authentication.service";
import history from "../lib/history";
const instance = axiosPrivate;
let isRefreshing = false;
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  const event = new Event('connectedChange');
  document.dispatchEvent(event);
  originalSetItem.apply(this, [key, value]);
}
instance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    if (!isRefreshing)
                    {
                        isRefreshing = true;
                        prevRequest.sent = true;
                        await axiosAuth.get('/api/authentication/refresh', {
                                withCredentials: true
                            }).then((response) => {
                                localStorage.setItem("user", JSON.stringify(response.data));
                                isRefreshing = false;
                                return instance(prevRequest);
                            }).catch((err)  => {
                                if (err?.response?.status === 401)
                                {
                                    localStorage.setItem("connected", JSON.stringify(false));
                                    setTimeout(function(){ history.push("/"); }, 1000);
                                }
                            });
                    }

                }
                return Promise.reject(error);
            }
);
export default instance;