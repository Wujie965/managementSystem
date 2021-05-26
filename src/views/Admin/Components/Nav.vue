<template>
    <div class="admin-nav">
        <div class="nav-header">
            <img src="./../../../assets/cj.png" class="icon-nav-logo" />
        </div>
        <el-menu 
            default-active="1-4-1" 
            class="el-menu-vertical-demo" 
            :collapse="isCollapse" 
            background-color="transparent"
            text-color="#fff"
            active-text-color="#fff"
            router>
            <template v-for="(item, index) in navItems">
                <el-submenu v-if="item.isDisplay" :key="item.id" :index="index + ''">
                    <template slot="title">
                        <svg-icon :iconClass="item.meta.icon" :iconUrl="item.meta.icon" />
                        <span slot="title">{{ item.meta.name }}</span>
                    </template>
                    <el-menu-item v-for="navItem in item.children" :key="navItem.id" :index="navItem.path">{{ navItem.meta.name }}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { ref, reactive, computed } from "@vue/composition-api"
export default {
    name: "adminNav",
    setup(props, context) {
        const navItems = reactive(context.root.$router.options.routes);

        const isCollapse = computed(() => context.root.$store.state.app.navOpen);

        return {
            navItems,
            isCollapse
        }
    }
}
</script>
<style lang="scss">
    @import "@/style/config.scss";
    .admin-nav {
        position: fixed;
        left: 0;
        top: 0;
        width: $adminNavWidth;
        height: 100vh;
        z-index: 5;
        background-color: #344a5f;
        @include webkit(transition, all .3s ease 0s);
        svg {
            font-size: 20px;
            margin-right: 10px;
        }
        .nav-header {
            text-align: center;
            padding: 20px 0 10px 0;
        }
        .icon-nav-logo {
            @include webkit(transition, all .3s ease 0s);
        }
    }
    .open {
        .admin-nav {
            width: $adminNavWidth;
            .icon-nav-logo {
                height: $iconNavLogo;
                width: $iconNavLogo;
            }
        }
    }
    .close {
        .admin-nav {
            width: $adminNavWidthMin;
            .icon-nav-logo {
                height: 40px;
                width: 40px;
            }
        }
    }
</style>
