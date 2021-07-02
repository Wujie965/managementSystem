import { GetCategory, AddFirstCategory, DeleteCategory, EditCategory } from "@/api/info";

const actions =  {
    getCategory(content, data) {
        return new Promise((reslove, reject) => {
            GetCategory(data).then(res => {
                reslove(res);
            }).catch(err => {
                reject(err);
            });
        });
    },
    addFirstCategory(content, data) {
        return new Promise((reslove, reject) => {
            AddFirstCategory(data).then(res => {
                reslove(res);
            }).catch(err => {
                reject(err);
            });
        });
    },
    deleteCategory(content, data) {
        return new Promise((reslove, reject) => {
            DeleteCategory(data).then(res => {
                reslove(res);
            }).catch(err => {
                reject(err);
            });
        });
    },
    editCategory(content, data) {
        return new Promise((reslove, reject) => {
            EditCategory(data).then(res => {
                reslove(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

const category = {
    namespaced: true,
    actions
}

export default category;