<script setup>

</script>


<template>
    <header class="app-header">

        <nav class="container-fluid h-100">

            <!-- Brand -->
            <RouterLink :to="{ name: 'home' }" class="app-header-brand">
                <h2 class="mb-0">
                    <span class="d-none d-md-inline">BDoctors</span>
                    <span class="d-md-none">BD</span>
                </h2>
            </RouterLink>

            <!-- SearchBox -->
            <div class="app-header-search me-auto">
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
    position: sticky;
    top: 0;

    background-color: $col-light;
    border-bottom: 1px solid $col-gray-500;
    z-index: 1;

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