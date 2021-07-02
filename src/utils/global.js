import { MessageBox } from "element-ui";

export function global() {
    const confirm = (params) => {
        MessageBox.confirm(params.content, params.theme || "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: params.type || "warning"
        }).then(() => {
            params.sureFunc && params.sureFunc(params.id);
        }).catch(() => {
            params.cancFunc && params.cancFunc();
        });
    }

    return {
        confirm
    }
}