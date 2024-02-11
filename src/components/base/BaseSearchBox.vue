<script setup>

</script>


<template>
    <div class="search-box">
        <i class="fas fa-search fa-fw search-box-icon"></i>
        <input type="text" id="search-typologies" class="form-control search-box-input" placeholder="Specializzazione"
            autocomplete="off">
    </div>
</template>


<style lang="scss" scoped>
.search-box {
    position: relative;

    &-icon {
        position: absolute;
        top: 50%;
        left: 0.5rem;
        transform: translateY(-50%);
    }

    &-input {
        padding-left: 2rem;
    }

}
</style>