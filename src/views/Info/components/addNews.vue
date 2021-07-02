<template>
    <el-dialog 
    title="新增" 
    :visible.sync="addNewsIsVisible" 
    :append-to-body="true" 
    :destroy-on-close="true"
    @close="addNewsClose"
    @open="addNewsOpen"
    width="580px">
        <el-form :model="categoryForm">
            <el-form-item label="类型" :label-width="formLabelWidth">
                <el-select v-model="categoryForm.type_value" placeholder="请选择">
                    <el-option
                    v-for="item in option.type_options" 
                    :key="item.value" 
                    :label="item.category_name" 
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input v-model="categoryForm.title" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="概况" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="categoryForm.situation" placeholder="请输入内容" :rows="3"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cannelAddNews">取消</el-button>
            <el-button type="danger" @click="sureAddNews" :loading="isAddingNews">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { ref, reactive, watch, onMounted } from "@vue/composition-api";
import { Message } from "element-ui";

export default {
    name: "addNews",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        category: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { root, emit }) {
        const addNewsIsVisible = ref(false);    //该变量用于添加弹窗是否被展示出来
        const formLabelWidth = ref("70px");     //设置弹窗中的label宽度
        const isAddingNews = ref(false);

        const option = reactive({
            type_options: []
        });
        const categoryForm = reactive({
            type_value: "",
            title: "",
            situation: ""
        });

        const addNewsClose = (() => {
            //如果回调中存在逻辑处理，则不能用修饰器
            emit("update:show", false);
        });

        const addNewsOpen = (() => {    //展示窗口
            option.type_options = props.category;   //通过父组件向子组件传值，将窗口展示出来
            clearCategoryForm();    //展示窗口的同时，清空表单中的数据
        });

        const sureAddNews = () => {     //添加信息
            isAddingNews.value = true;  //将按钮设置为信息提交中，防抖
            setTimeout(() => {
                isAddingNews.value = false; //恢复提交按钮，将按钮设置为可提交状态
                if(categoryForm.type_value && categoryForm.title && categoryForm.situation) {
                    root.$store.dispatch("news/addNews", {
                        category: categoryForm.type_value,
                        title: categoryForm.title,
                        content: categoryForm.situation
                    }).then(res => {
                        Message.success(res.data.message);
                        clearCategoryForm();
                    })
                    .catch(err => {
                        Message.error(err.message);
                    });
                    addNewsIsVisible.value = false;   //隐藏新闻添加窗口
                }
                else {
                    Message.error("提交信息不完善，请核对后再提交!");
                }
            }, 2000);
        }

        const clearCategoryForm = (() => {  //清空表单中的信息
            categoryForm.type_value = "";
            categoryForm.title = "";
            categoryForm.situation = "";
        });

        const cannelAddNews = () => {
            Message.info("已取消新闻添加!");
            addNewsIsVisible.value = false;   //隐藏新闻添加窗口
        }

        watch(() => props.show, (newS, oldS) => {
            addNewsIsVisible.value = newS;
        });

        return {
            //ref
            addNewsIsVisible, formLabelWidth, isAddingNews,
            //reactive
            option, categoryForm,
            //function
            addNewsClose, addNewsOpen, sureAddNews, cannelAddNews
        }
    }
}
</script>
<style lang="scss">

</style>