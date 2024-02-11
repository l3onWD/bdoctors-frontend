<script setup>
import { ref } from 'vue';
import { apiClient } from '@/http';


//*** SEARCH THROTTLE ***//
const searchThrottleTime = 500;
const searchThrottleCounter = ref(null);

const searchThrottle = () => {

    // Throttle Logic
    clearTimeout(searchThrottleCounter.value);

    searchThrottleCounter.value = setTimeout(() => {
        searchTypologies();
    }, searchThrottleTime);
}


//*** SEARCH TYPOLOGIES ***//
const isLoading = ref(false);
const searchTerm = ref('');
const typologies = ref([]);

const searchTypologies = () => {

    // Data
    const params = { name: searchTerm.value };
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


//*** SEARCH RESET ***//
const serchInput = ref(null);

const searchReset = () => {
    searchTerm.value = '';
    typologies.value = [];

    serchInput.value.focus();
}


//*** SEARCH ACTIVE ***//
const isActive = ref(false);

</script>


<template>
    <div class="search-box">

        <!-- Icon -->
        <button class="search-box-icon">
            <i class="fas fa-search fa-fw"></i>
        </button>

        <!-- Search Input -->
        <input v-model.trim="searchTerm" type="text" class="form-control search-box-input" placeholder="Specializzazione"
            autocomplete="off" @input="searchThrottle" @focusin="isActive = true" @focusout="isActive = false"
            ref="serchInput">

        <!-- Reset Button -->
        <button v-if="searchTerm" class="search-box-reset" @click="searchReset">
            <i class="fas fa-close fa-fw"></i>
        </button>

        <!-- Suggests -->
        <div v-if="isActive" class="search-box-suggests">

            <!-- Fetched -->
            <ul v-if="typologies.length" class="suggests-fetched">
                <li v-for="typology in typologies" :key="typology.id">
                    <i class="fa-fw" :class="typology.icon"></i>
                    <span>{{ typology.name }}</span>
                </li>
            </ul>

            <!-- Recents -->
            <ul v-else>
                <li>
                    <h6>Recenti</h6>
                </li>
                <li>Test</li>
            </ul>

        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;

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

    &-suggests {
        position: absolute;
        top: calc(100% + 0.25rem);
        left: 0;
        min-height: 2.5rem;
        max-height: 200px;
        width: 100%;

        background-color: $col-light;
        border: 1px solid $col-gray-500;
        border-radius: 0.5rem;
        overflow-y: auto;

        h6 {
            font-size: 0.8rem;
        }

        ul {
            li {
                padding: 0.5rem 1rem;

                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;

                &:hover:not(:has(h6)) {
                    background-color: $col-gray-500;
                }
            }
        }
    }

}
</style>