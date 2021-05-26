import { Login } from "@/api/login";
import { setToken, setUsername, getUsername, removeToken, removeUsername } from "@/utils/common";

const state = {
    navOpen: JSON.parse(sessionStorage.getItem("navOpen")) || false,
    token: "",
    username: getUsername() || ""
}

const getters = {
    getNavOpen: (state) => state.navOpen
}

const mutations = {
    SET_NAVOPEN(state) {
        state.navOpen = !state.navOpen;
        sessionStorage.setItem("navOpen", JSON.stringify(state.navOpen));
    },
    SET_TOKEN(state, value) {
        state.token = value;
    },
    SET_USERNAME(state, value) {
        state.username = value;
    }
}

const actions =  {
    login({ commit }, data) {
        return new Promise((reslove, reject) => {
            Login(data).then((res) => {
                let data = res.data.data;
                commit("SET_TOKEN", data.token);
                commit("SET_USERNAME", data.username);
                setToken(data.token);
                setUsername(data.username)
                reslove(res);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    exit({ commit }) {
        return new Promise((reslove, reject) => {
            removeToken();
            removeUsername();
            commit("SET_TOKEN", "");
            commit("SET_USERNAME", "");
            reslove();
        });
    }
}

const app = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default app;
