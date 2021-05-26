<template>
    <div class="admin-head">
        <div class="pull-left header-icon" @click="navStatusChange"><svg-icon iconClass="menu" iconUrl="menu" /></div>
        <div class="pull-right">
            <div class="pull-left user-info">
                <img src="./../../../assets/user-info.jpg" />{{ uname }}
            </div>
            <div class="pull-left header-icon" @click="exit"><svg-icon iconClass="exit" iconUrl="exit" /></div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../../../components/icon/SvgIcon.vue';
import { computed } from "@vue/composition-api";

export default {
  components: { SvgIcon },
    name: "adminHead",
    setup(props, context) {
        const uname = computed(() => context.root.$store.state.app.username);
        const navStatusChange = () => {
            context.root.$store.commit("app/SET_NAVOPEN");
        };
        const exit = () => {
            
            context.root.$confirm('是否立即退出该用户？', '提示', {
                confirmButtonText: '退出',
                cancelButtonText: '再考虑一下',
                type: 'error'
            }).then(() => {
                context.root.$message({
                    type: 'success',
                    message: '退出成功！'
                });
                context.root.$store.dispatch("app/exit").then(() => {
                    context.root.$router.push({
                        name: "Login"
                    });
                });
            }).catch(() => {
                context.root.$message({
                    type: 'info',
                    message: '已取消退出操作！'
                });          
            });
        };

        return {
            navStatusChange,
            uname,
            exit
        }
    }
}
</script>
<style lang="scss">
    @import "@/style/config.scss";
    .admin-head{
        position: fixed;
        top: 0;
        left: $adminNavWidth;
        right: 0;
        height: $adminHeadHeight;
        z-index: 3;
        line-height: 75px;
        @include webkit(transition, all .3s ease 0s);
        @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));
        .header-icon {
            padding: 0 32px;
            svg {
                font-size: 25px;
                margin-bottom: -8px;
                cursor: pointer;
            }
        }
        .user-info {
            height: 100%;
            border-right: 1px solid #ededed;
            padding: 0 32px;
            + .header-icon {
                padding: 0 28px;
            }
            img {
                width: 40px;
                height: 40px;
                margin: 0 32px -15px 0;
                border-radius: 50%;
            }
        }
    }
    .open {
        .admin-head{
            left: $adminNavWidth;
        }
    }
    .close {
        .admin-head{
            left: $adminNavWidthMin;
        }
    }
</style>
