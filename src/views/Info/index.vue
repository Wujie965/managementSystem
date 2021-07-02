<template>
    <div class="list">
        <div class="list-wrap">
            <el-form :inline="true" class="demo-form-inline">
                <el-row>
                    <el-col :span="3">
                        <div class="type-parallel">
                            <label>类型：</label>
                            <div class="line-component">
                                <el-select class="component-fill" v-model="searchData.type_value" placeholder="请选择">
                                    <el-option 
                                    v-for="item in searchData.type_options" 
                                    :key="item.value" 
                                    :label="item.category_name" 
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="date-parallel">
                            <label>日期：</label>
                            <div class="line-component">
                                <el-date-picker
                                class="component-fill" 
                                v-model="searchData.date"
                                type="datetimerange"
                                align="right"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['12:00:00', '08:00:00']">
                                </el-date-picker>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="key-parallel">
                            <label>关键字：</label>
                            <div class="line-component">
                                <el-select class="component-fill" v-model="searchData.key_value">
                                    <el-option 
                                    v-for="item in searchData.key_options" 
                                    :key="item.value" 
                                    :label="item.label" 
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="search-parallel">
                            <div class="line-component">
                                <label></label>
                                <el-input class="component-fill"  v-model="searchData.key_word" placeholder="请输入内容"></el-input>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div class="search-parallel">
                            <label></label>
                            <div class="line-component">
                                <el-button class="component-fill" type="danger" icon="el-icon-search" @click="onSubmit">搜索</el-button>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4" class="spcce-fill"></el-col>
                    <el-col :span="2">
                        <div class="add-parallel">
                            <label></label>
                            <div class="line-component">
                                <el-button class="component-fill" type="danger" icon="el-icon-plus" @click="addNewsIsVisible = true">新增</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <div class="space-vtl-30"></div>
            <el-table :data="tempData" border v-loading="loadingInfo" @selection-change="deleteItemSelect" style="width: 100%">
                <el-table-column type="selection" width="45"></el-table-column>
                <el-table-column prop="title" label="标题" width="830"></el-table-column>
                <el-table-column prop="type" label="类型" width="110"></el-table-column>
                <el-table-column prop="date" label="日期" width="237"></el-table-column>
                <el-table-column prop="user" label="管理人" width="135"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="deleteNews(scope.row.user)">删除</el-button>
                        <el-button
                        size="mini"
                        type="success"
                        @click="addNewsIsVisible = true">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="space-vtl-30"></div>
            <el-row>
                <el-col :span="12">
                    <el-button size="medium" :loading="itemDeleting" @click="deleteSomeNews">批量删除</el-button>
                </el-col>
                <el-col :span="12">
                    <el-pagination
                    class="pull-right"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="tableData.currentPage"
                    :page-size="10"
                    layout="prev, pager, next"
                    :total="tableData.total">
                    </el-pagination>
                </el-col>
            </el-row>
            <add-news :show.sync="addNewsIsVisible" :category="searchData.type_options" />
        </div>
    </div>
</template>
<script>
import AddNews from "./components/addNews";
import { global } from "@/utils/global";
import { ref, reactive, onMounted } from "@vue/composition-api";
import { Message } from "element-ui";

export default {
    name: "InfoList",
    components: { AddNews },
    setup(props, { root }) {
        const { confirm } = global();
        /**
         *  ref 数据
         */
        //添加新闻的弹出层是否可见
        const addNewsIsVisible = ref(false);
        //表格加载状态
        const loadingInfo = ref(false);
        //批量删除按钮防抖
        const itemDeleting = ref(false);
        
        /**
         * reactive 对象
         */
        const searchData = reactive({    //关键字搜索
            type_value: "",
            date: "",
            key_word: "",
            key_value: "id",
            type_options: [],   //信息类型选项
            key_options: [{     //关键词选项
                label: "ID",
                value: "id"
            },
            {
                label: "标题",
                value: "title"
            }]
        });

        const tempData = reactive([{       //表格数据
          title: "国务院通知，所有人打了疫苗方可...",
          type: "国际信息",
          date: "2016-05-02",
          user: "笑嘻嘻"
        },
        {
          title: "四川省绵阳市某公司程序员半夜暴...",
          type: "国内信息",
          date: "2017-06-31",
          user: "天秀"
        },
        {
          title: "重庆市某小区突然火灾，女子窗外避火...",
          type: "国内信息",
          date: '2018-02-30',
          user: "雨秀"
        },
        {
          title: "广西某小程序泄露用户信息，警方...",
          type: "行业信息",
          date: '2018-09-09',
          user: "铭秀"
        },
        {
          title: "某男子跌落悬崖，偶得...",
          type: "行业信息",
          date: "2020-06-21",
          user: "我是混子我怕谁"
        }]);

        const tableData = reactive({
            item: [],
            total: 110,
            currentPage: 1,
            deleteItem: []
        });
    
        /**
         * es6 函数
         */
        const onSubmit = (() => {
            console.log('submit!');
        });

        const addNewsUnvisible = ((val) => {//触发添加信息弹出层
            addNewsIsVisible.value = val;
        });

        const deleteNews = ((val) => {         //逐个删除
            confirm({
                content: "确认删除该信息？",
                theme: "提示",
                id: val,
                sureFunc: sureDeleteNews,
                cancFunc: canaDeleteNews
            });
        });

        const deleteSomeNews = (() => {     //批量删除
            itemDeleting.value = true;      //将批量删除按钮的状态设为加载状态防抖
            setTimeout(() => {
                itemDeleting.value = false; //还原批量删除按钮

                if(tableData.deleteItem || tableData.deleteItem.length == 0) {
                    Message.info("请选择您需要删除的选项！");
                    return ;
                }

                confirm({
                    content: "确认删除已选信息？",
                    theme: "提示",
                    id: tableData.deleteItem,
                    sureFunc: sureDeleteNews,
                    cancFunc: canaDeleteNews
                });
            }, 1500);
        });

        const sureDeleteNews = ((val) => {     //确认删除回调
        console.log(val);
            Message.success("删除成功!");
            tableData.deleteItem = "";      //清空删除列表中的所有选项
        });

        const canaDeleteNews = (() => {     //取消删除回调
            Message.info("已取消删除");
        });

        const handleSizeChange = (() => {});

        const handleCurrentChange = ((val) => {
            tableData.currentPage = val;
            getNews();
        });

        const getCategory = (() => {
            root.$store.dispatch("category/getCategory", {})    //获取类型列表
            .then(res => {
                searchData.type_options = res.data.data.data;
            })
            .catch(err => {
                Message.error(err.message);
            });
        });


        const getNews = (() => {
            loadingInfo.value = true;
            root.$store.dispatch("news/getNews", {  //获取新闻列表
                pageNumber: tableData.currentPage,
                pageSize: 10
            }).then(res => {
                tableData.item = res.data.data.data;
                console.log(tableData.item)
                loadingInfo.value = false;
            })
            .catch(err => {
                Message.error(err.message);
                loadingInfo.value = false;
            });
        });

        const deleteItemSelect = ((val) => {    //获取选中的列表id
            tableData.deleteItem = val.map(item => item.user);
        });

        onMounted(() => {
            getCategory();
            getNews();
        });

        return { 
            //ref
            addNewsIsVisible, loadingInfo, itemDeleting, 
            //reactive
            searchData, tempData, tableData,
            //es6 函数
            onSubmit, addNewsUnvisible, deleteNews, deleteSomeNews, handleSizeChange, handleCurrentChange, deleteItemSelect
        }
    }
}
</script>
<style lang="scss">
    @import "@/style/main.scss";
    .list {
        height: 100vh;
        .list-wrap {
            width: 100%;
            height: 100%;
            padding: $contentMainPadding $contentMainPadding;
            padding-bottom: 0;
            @include webkit(box-sizing, border-box);
            .spcce-fill {
                height: 40px;
            }
            .type-parallel {
                @include line-label(60, 40);
            }
            .date-parallel {
                @include line-label(109, 40);
            }
            .key-parallel {
                @include line-label(115, 40);
            }
            .search-parallel, .add-parallel {
                @include line-label(16, 40);
            }
        }
    }
</style>