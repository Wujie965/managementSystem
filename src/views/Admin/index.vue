<template>
    <div :class="navOpen ? 'close admin' : 'open admin'">
        <AdminNav />
        <AdminHead />
        <AdminMain />
    </div>
</template>
<script>
import AdminNav from "./Components/Nav";
import AdminHead from "./Components/Head";
import AdminMain from "./Components/Main";
import { computed } from "@vue/composition-api";

export default {
    name: "admin",
    components: {AdminNav, AdminHead, AdminMain},
    setup(props, context) {
        const navOpen = computed(() => context.root.$store.state.app.navOpen);

        return {
            navOpen
        }
    }
}
</script>
<style lang="scss">
    .admin {
        background-color: #f7f7f7;
    }
</style>
