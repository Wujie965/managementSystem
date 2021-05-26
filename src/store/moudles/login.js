const login = {
    state: {
        navOpen: JSON.parse(sessionStorage.getItem("navOpen")) || false
    },
    getters: {},
    mutations: {
        SET_NAVOPEN(state) {
            state.navOpen = !state.navOpen;
            sessionStorage.setItem("navOpen", JSON.stringify(state.navOpen));
        }
    },
    actions: {
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
}

export default login;