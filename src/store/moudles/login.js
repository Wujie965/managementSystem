import { Login } from "@/api/login";

const state = {
    navOpen: JSON.parse(sessionStorage.getItem("navOpen")) || false
}

const getters = {
    getNavOpen: (state) => state.navOpen
}

const mutations = {
    SET_NAVOPEN(state) {
        state.navOpen = !state.navOpen;
        sessionStorage.setItem("navOpen", JSON.stringify(state.navOpen));
    }
}

const actions =  {
    login(content, data) {
        return new Promise((reslove, reject) => {
            Login(data).then((res) => {
                reslove(res);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

const login = {
    namespaced: true,
    state,
    mutations,
    actions
}

export default login;