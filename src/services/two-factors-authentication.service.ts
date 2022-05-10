import Cookies from "cookies-js";
import api from "../api/api";

 const ROUTE = "/api/two-factor-authentication/";

 class TwoFactorAuthenticationService {
    async getSecretQr() {
          const res = await fetch(process.env.PUBLIC_URL + ROUTE + "generate", {
              method: 'POST',
              headers: {
                  Cookies: Cookies.get("Authentication")
              }
          });
          const imageBlob = await res.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
           return imageObjectURL;
    }

    async turnOn(twoFactorAuthenticationCode: string) {
        return api.post(process.env.PUBLIC_URL + ROUTE + "turn-on", {
            twoFactorAuthenticationCode
        }).then(response => {
            return response.data;
        });
    }

    async turnOff(twoFactorAuthenticationCode: string) {
        return api.post(process.env.PUBLIC_URL + ROUTE + "turn-off", {
            twoFactorAuthenticationCode
        }).then(response => {
            return response.data;
        });
    }

    async authenticate(twoFactorAuthenticationCode: string) {
        return api.post(process.env.PUBLIC_URL + ROUTE + "authenticate", {
            twoFactorAuthenticationCode
        },).then(response => {
            if (response.data.id) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
 }

export default new TwoFactorAuthenticationService();