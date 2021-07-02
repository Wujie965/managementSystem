<template>
    <div class="category">
        <div class="category-wrap">
            <el-button type="danger" @click="one_or_two">{{ !is_one ? "添加一级分类" : "添加二级分类" }}</el-button>
            <hr class="hr-e9e9e9" />
            <div>
                <el-row :gutter="30">
                    <el-col :span="8">
                        <div class="category-wrap-bottom-left">
                            <div class="category-wrap-bottom-left-module" v-for="(item, index) in options.categories" :key="item.id">
                                <h4>
                                    <svg-icon iconClass="minus" iconUrl="minus" />
                                    {{ item.category_name }}
                                    <div class="button-class">
                                        <el-button size="mini" type="danger" round @click="selectCategory(item.id, index)">编辑</el-button>
                                        <el-button size="mini" type="success" round>添加子级</el-button>
                                        <el-button size="mini" round @click="deleteCategory(item.id, index)">删除</el-button>
                                    </div>
                                </h4>
                                <ul>
                                    <li v-for="subitem in item.children" :key="subitem.id">
                                        {{ subitem.category_name }}
                                        <div class="button-class">
                                            <el-button size="mini" type="danger" round>编辑</el-button>
                                            <el-button size="mini" round>删除</el-button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="category-wrap-bottom-right">
                            <h4>一级分类编辑</h4>
                            <el-form label-width="142px" :model="categoryData" class="form-wrap">
                                <el-form-item label="一级分类名称：">
                                    <el-input v-model="categoryData.categoryName"></el-input>
                                </el-form-item>
                                <el-form-item label="二级分类名称：" v-if="!is_one">
                                    <el-input v-model="categoryData.secCategoryName"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="danger" @click="alterCategory" :loading="is_submitting">确定</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, reactive, onMounted, watch } from "@vue/composition-api";
import { Message, MessageBox } from "element-ui";

export default {
    name: "InfoCategory",
    setup(props, { root }) {
        const is_one = ref(true);          //是否展示二级菜单的输入框
        const is_submitting = ref(false);   //判断提交按钮是否处于正在提交中状态
        const updateModule = ref(0);        //提交状态：0-add-main 1-add-sub 2-update-main 3-update-sub

        const options = reactive({       //当做一个缓存用于存放菜单
            categories: []
        });

        const categoryData = reactive({     //用于获取一级或二级输入框的值
            categoryName: "",
            secCategoryName: ""
        });

        const tempCategory = reactive({
            data: null
        });

        const one_or_two = (() => {  //切换添加一级或二级菜单的单击事件
            is_one.value = !is_one.value;
            is_one.value ? updateModule.value = 0 : updateModule.value = 1;
        });

        const addCategory = (() => {
            if(categoryData.categoryName) { //将一级目录数据提交至后台
            
                is_submitting.value = true; //使提交按钮显示为正在提交中

                root.$store.dispatch("category/addFirstCategory", {
                    categoryName: categoryData.categoryName
                })
                .then(res => {
                    Message.success(res.data.message);      //打印添加成功的信息
                    options.categories.push(res.data.data);    //将新增的数据放入数组，避免重新请求耗费资源
                    categoryData.categoryName = "";         //清空输入框
                    is_submitting.value = false; //使提交按钮退出正在提交中状态
                })
                .catch(err => {
                    Message.error(err.message);             //打印请求失败的信息
                    categoryData.categoryName = "";         //清空输入框
                    is_submitting.value = false; //使提交按钮退出正在提交中状态
                });
            }
            else {
                Message.warning("输入框不能为空！");
            }
        });

        const deleteCategory = ((id, index) => {//删除一级菜单
            // console.log(options.categories.findIndex(item => item.id == id));
            // options.categories.splice(options.categories.findIndex(item => item.id == id), 1);

            // console.log(options.categories.filter(item => item.id != id));
            // options.categories = options.categories.filter(item => item.id != id);

            MessageBox.confirm("确认删除该目录?", "温馨提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                root.$store.dispatch("category/deleteCategory", {
                    categoryId: id
                })
                .then(res => {
                    options.categories.splice(index, 1);
                    Message.success(res.data.message);
                })
                .catch(err => {
                    Message.error(err.message);
                });
            }).catch(() => {
                Message.info("已取消删除");
            });
        });

        const editCategory = (() => {       //编辑一级菜单
            if(tempCategory.data === null) {
                Message.error("请选择需要修改的菜单！");
                return;
            }
            if(categoryData.categoryName === tempCategory.data.category_name) {
                Message.error("该菜单未作出任何改动！");
                return;
            }

            root.$store.dispatch("category/editCategory", {
                id: tempCategory.data.id,
                categoryName: categoryData.categoryName
            })
            .then(res => {
                console.log(res.data.message);
                categoryData.categoryName = "";
                options.categories.filter(item => item.id == tempCategory.data.id)[0].category_name = res.data.data.data.categoryName;
                tempCategory.data = null;
                Message.success(res.data.message);
            })
            .catch(err => {
                Message.error(err.message);
            });
        });

        const selectCategory = (id, index) => {
            updateModule.value = 2;         //改变按钮提交模块
            is_one.value = true;            //隐藏二级菜单
            tempCategory.data = options.categories[index];//将当前点击的菜单放入缓存
            //将缓存中的菜单名在一级菜单输入框中展示
            categoryData.categoryName = tempCategory.data.category_name;
        }

        const alterCategory = (() => {      //对菜单进行操作
            switch(updateModule.value) {
                case 0: //添加一级菜单
                    addCategory();break;
                case 1: //添加二级菜单
                    break;
                case 2: //修改一级菜单
                    editCategory();break;
                case 3: //修改二级菜单
                    break;
            }
        });

        onMounted(() => {
            root.$store.dispatch("category/getCategory", {})
            .then(res => {
                options.categories = res.data.data.data;
            })
            .catch(err => {
                Message.error(err.message);
            });
        });

        return {
            //ref
            is_one, is_submitting,
            //reactive
            options, categoryData,
            //function
            one_or_two, deleteCategory, selectCategory, alterCategory
        }
    }
}
</script>
<style lang="scss">
    @import "./../../style/config";

    .category {
        height: 100vh;
        .category-wrap {
            width: 100%;
            height: 100%;
            padding: $contentMainPadding $contentMainPadding;
            padding-bottom: 0;
            @include webkit(box-sizing, border-box);
            .hr-e9e9e9 {
                border: 0;
                border-bottom: 1px solid #e9e9e9;
                margin: 30px -30px;
            }
            .category-wrap-bottom-left{
                overflow: auto;
                .category-wrap-bottom-left-module {
                    position: relative;
                    line-height: 44px;
                    &:before {
                        content: "";
                        position: absolute;
                        left: 19px;
                        top: 0;
                        bottom: 0;
                        border-left: 1px dotted #000;
                    }
                    &:first-child {
                        &:before {
                            top: 20px;
                        }
                    }
                    &:last-child {
                        &:before {
                            bottom: 20px;
                        }
                    }
                    h4 {
                        padding-left: 40px;
                        svg {
                            position: absolute;
                            left: 12px;
                            top: 15px;
                            background: #fff;
                        }
                    }
                    li {
                        position: relative;
                        padding-left: 40px;
                        margin-left: 20px;
                        &:before {
                            content: "";
                            position: absolute;
                            width: 32px;
                            left: 0;
                            top: 23px;
                            border-bottom: 1px dotted #000;
                        }
                    }
                    h4, li {
                        @include webkit(transition, all .5s ease 0s);
                        &:hover {
                            background: #f3f3f3;
                            .button-class {
                                display: block;
                            }
                        }
                    }
                    .button-class {
                        display: none;
                        position: absolute;
                        z-index: 2;
                        right: 11px;
                        top: -1px;
                        button {
                            font-size: 12px;
                        }
                    }
                }
            }
            .category-wrap-bottom-right {
                h4 {
                    line-height: 44px;
                    background: #f3f3f3;
                    padding-left: 22px;
                }
                .form-wrap {
                    width: 410px;
                    padding-top: 26px;
                }
            }
        }
    }
</style>