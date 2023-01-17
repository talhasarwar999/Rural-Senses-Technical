// Cookie
import Cookie from "js-cookie";

//Remove Cookie
const RemoveCookie = (cookiename) => {
  Cookie.remove(cookiename);
};

export default RemoveCookie;
