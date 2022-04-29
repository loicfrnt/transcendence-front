import axios from "axios";
import localAvatar from "../../public/images/avatar.png"

const ROUTE = "/api/local-files/"

class LocalFilesService {
    async retriveFile(id: number) {
        if (id === 0)
        {
          const res = await fetch(window.location.origin + "/images/avatar.png");
          const imageBlob = await res.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
           return imageObjectURL;
        }
        else
            return await fetch(process.env.PUBLIC_URL + "/api/local-files/" + id).then(async (res)=>{
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            return imageObjectURL;
          }).catch( async () => {
            const res =  await fetch(window.location.origin + "/images/avatar.png");
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            return imageObjectURL;
          });
    }
}

export default new LocalFilesService;