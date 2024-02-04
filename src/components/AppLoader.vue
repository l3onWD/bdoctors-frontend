<script setup>

</script>


<template>
    <div class="app-loader">
        <i class="fas fa-spinner fa-spin-pulse fa-5x"></i>
    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;

.app-loader {
    position: fixed;
    inset: $header-height 0 0 0;

    display: flex;
    justify-content: center;
    align-items: center;
    color: $col-gray-700;
    background-color: $col-light;
}
</style>