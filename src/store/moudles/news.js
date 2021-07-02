import { AddNews, GetNews, DeleteNews } from "@/api/info";

const state = {}

const actions = {
    addNews(content, data) {
        return new Promise((resolve, reject) => {
            AddNews(data).then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
        });
    },
    getNews(content, data) {
        return new Promise((resolve, reject) => {
            GetNews(data).then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
        });
    },
    deleteNews() {
        return new Promise((resolve, reject) => {
            DeleteNews(data).then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
        });
    }
}

const news = {
    namespaced: true,
    state,
    actions
}

export default news;
