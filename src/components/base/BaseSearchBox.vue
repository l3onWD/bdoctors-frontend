<script setup>
import { ref } from 'vue';
import { apiClient } from '@/http';


//*** SEARCH THROTTLE ***//
const searchThrottleTime = 500;
const searchThrottleCounter = ref(null);

const searchThrottle = () => {

    // Input Validation
    if (searchInput.value.length < 2) return;


    // Throttle Logic
    clearTimeout(searchThrottleCounter.value);

    searchThrottleCounter.value = setTimeout(() => {
        searchTypologies();
    }, searchThrottleTime);
}


//*** SEARCH TYPOLOGIES ***//
const isLoading = ref(false);
const searchInput = ref('');
const typologies = ref([]);

const searchTypologies = () => {

    // Data
    const params = { name: searchInput.value };
    isLoading.value = true;

    // Fetching
    apiClient.get('/typologies/search', { params })
        .then(({ data }) => {
            typologies.value = data;
        })
        .catch(err => {
            console.error(err);
        })
        .then(() => {
            isLoading.value = false;
        });
}

</script>


<template>
    <div class="search-box">

        <button class="search-box-icon">
            <i class="fas fa-search fa-fw"></i>
        </button>

        <input v-model.trim="searchInput" type="text" class="form-control search-box-input" placeholder="Specializzazione"
            autocomplete="off" @input="searchThrottle">

        <button v-if="searchInput" class="search-box-reset" @click="searchInput = ''">
            <i class="fas fa-close fa-fw"></i>
        </button>

    </div>
</template>


<style lang="scss" scoped>
.search-box {
    position: relative;

    &-icon {
        padding: 0.25rem;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);

        background-color: transparent;
        border: none;
    }

    &-input {
        padding: 0 1.8rem;
        height: 2.5rem;
    }

    &-reset {
        padding: 0.25rem;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);

        background-color: transparent;
        border: none;
    }

}
</style>