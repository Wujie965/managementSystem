<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="svgUrl"></use>
    </svg>
</template>
<script>
import { computed } from "@vue/composition-api";

export default {
    name: "svgIcon",
    // props: ["iconClass", "iconUrl"],
    props: {
        iconClass: {
            type: String,
            default: ""
        }, 
        iconUrl: {
            type: String,
            default: ""
        }
    },
    setup(props) {
        const svgUrl = computed(() => `#icon-${props.iconUrl}`);
        const svgClass = computed(() => {
            if(props.iconClass) {
                return `svg-icon ${props.iconClass}`;
            }
            else {
                return `svg-icon`;
            }
        });
        return {
            svgClass,
            svgUrl
        }
    }
}
</script>
<style lang="scss">
    .svg-icon {
        width: 1em;
        height: 1em;
        fill: currentColor;
    }
</style>
