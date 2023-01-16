//Cookie
import Cookie from "js-cookie";

// Set Cookie
var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
const SetCookie = (cookiename, userInfo) => {
  Cookie.set(cookiename, userInfo, {
    expires: inFifteenMinutes,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export default SetCookie;
