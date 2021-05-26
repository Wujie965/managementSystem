<template>
    <div class="console-wrap">
        <div class="console-content">
            sss
        </div>
    </div>
</template>
<script>
export default {
    name: "Console",
    setup(props, context) {

    }
}
</script>
<style lang="scss">
    @import "@/style/config.scss";
    .console-wrap {
        height: 100vh;
        .console-content {
            width: 100%;
            height: 100%;
            padding-top: $contentMainPadding;
            padding-left: $contentMainPadding;
            @include webkit(box-sizing, border-box);
        }
    }
</style>