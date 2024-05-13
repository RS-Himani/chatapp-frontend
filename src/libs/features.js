import moment from "moment";
import { NEW_MESSAGE_ALERT } from "../constants/events";

const fileFormat = (url = "") => {
    const fileExt = url.split(".").pop();
    if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
        return "video";

    if (fileExt === "mp3" || fileExt === "wav") 
        return "audio";
    if(
        fileExt === "png" ||
        fileExt === "jpg" ||
        fileExt === "jpeg" ||
        fileExt === "gif"
    )
        return "image";

    return "file";
};


const transformImage = (url = "", width = 100) => url;
// const transformImage = (url = "", width = 100) => {
//     const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  
//     return newUrl;
//   };

const getLast70days = () => {
    const currentDate = moment();

    const last70days = [];

    for (let i = 0; i < 7; i++ ){
        const dayDate = currentDate.clone().subtract(i, "days");
        const dayName = dayDate.format("dddd");

        last70days.unshift(dayName);
    }
    return last70days;
};

const getOrSaveFromStorage = ({ key, value, get }) => {
    if (get) {
      return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
    } else {
      localStorage.setItem(NEW_MESSAGE_ALERT, JSON.stringify(value));
    }
  };
  
export { fileFormat, transformImage, getLast70days, getOrSaveFromStorage };
