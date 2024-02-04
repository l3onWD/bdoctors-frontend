<script setup>

</script>


<template>
    <header class="app-header">

        <nav class="container-fluid h-100">

            <!-- Brand -->
            <RouterLink :to="{ name: 'home' }" class="app-header-brand">
                <h2 class="mb-0">BDoctors</h2>
            </RouterLink>

            <!-- SearchBox -->
            <div class="app-header-search">
                <input type="text" id="search-typologies" class="form-control" placeholder="Specializzazione"
                    autocomplete="off">
            </div>

            <!-- Menu -->
            <ul>
                <li>
                    <a href="http://127.0.0.1:8000">Accedi</a>
                </li>
            </ul>
        </nav>
    </header>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;

.app-header {
    height: $header-height;

    border-bottom: 1px solid $col-gray-500;

    .container-fluid {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    &-search {
        width: 250px;
    }
}
</style>