//Cookie
import Cookie from "js-cookie";

// Set Cookie
const SetCookie = (cookiename, userInfo) => {
  Cookie.set(cookiename, userInfo, {
    expires: 1,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export default SetCookie;
