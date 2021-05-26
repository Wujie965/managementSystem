<template>
    <div class="admin-main">
        <router-view />
    </div>
</template>
<script>
export default {
    name: "adminMain",
    setup() {}
}
</script>
<style lang="scss">
    @import "@/style/config.scss";
    .admin-main {
        position: fixed;
        left: $adminNavWidth;
        right: 0;
        top: $adminHeadHeight;
        bottom: 0;
        border: 30px solid #f7f7f7;
        border-bottom: 0;
        border-right: 0;
        z-index: 1;
        box-sizing: border;
        -webkit-box-sizing: border;
        @include webkit(transition, all .3s ease 0s);
    }
    .open {
        .admin-main {
            left: $adminNavWidth;
        }
    }
    .close {
        .admin-main {
            left: $adminNavWidthMin;
        }
    }
</style>
