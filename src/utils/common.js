import cookie from "cookie_js";

const adminToken = "admin_Token";
const uname = "username";

export function setToken(value) {
    return cookie.set(adminToken, value);
}

export function getToken() {
    return cookie.get(adminToken);
}

export function removeToken() {
    return cookie.remove(adminToken);
}

export function setUsername(value) {
    return cookie.set(uname, value);
}

export function getUsername() {
    return cookie.get(uname);
}

export function removeUsername() {
    return cookie.remove(uname);
}
