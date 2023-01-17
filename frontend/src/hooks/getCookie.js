//Cookie
import Cookie from "js-cookie";

//Get Cookie
const GetCookie = (cookiename) => {
  return Cookie.get(cookiename);
};

export default GetCookie;
