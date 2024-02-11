<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { apiClient } from '@/http';


//*** SEARCH THROTTLE ***//
const searchThrottleTime = 500;
const searchThrottleCounter = ref(null);
const isLoading = ref(false);


const searchThrottle = () => {

    isLoading.value = true;

    // Throttle Logic
    clearTimeout(searchThrottleCounter.value);

    searchThrottleCounter.value = setTimeout(() => {
        searchTypologies();
    }, searchThrottleTime);
}


//*** SEARCH TYPOLOGIES ***//
const searchTerm = ref('');
const typologies = ref([]);

const searchTypologies = () => {

    // Data
    const params = { name: searchTerm.value };

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
const searchReset = () => {
    searchTerm.value = '';
    typologies.value = [];
}


//*** HANDLE ACTIVE ***//
const isActive = ref(false);

const removeActive = () => {
    isActive.value = false;
}


//*** HANDLE SELECTED TYPOLOGY ***//
const router = useRouter();

const setTypology = (typology) => {

    // Set selected typology data
    searchTerm.value = typology.name;
    typologies.value = [typology];

    removeActive();

    // Update storage
    storeRecentTypologies(typology);

    // Go to search page
    router.push({ name: 'search', query: { typologyName: typology.name, 'typologies[]': typology.id } })
}


//*** HANDLE PAGE CHANGE ***//
const route = useRoute();
const isSearchPage = computed(() => route.name === 'search');

watch(isSearchPage, (isSearchPage) => {
    if (!isSearchPage) {
        searchReset();
    } else {
        searchTerm.value = route.query.typologyName;
        searchTypologies();
    }
});


//*** RECENT SEARCH ***//
const recentTypologies = ref(JSON.parse(localStorage.getItem('recentTypologies')) || []);

const storeRecentTypologies = typology => {

    // Check if is already present
    if (recentTypologies.value.some(({ id }) => typology.id === id)) return

    // Update list
    recentTypologies.value.push(typology);

    // Remove the first item if list has more than 3 items
    if (recentTypologies.value.length > 3) recentTypologies.value.shift();

    // Set storage
    localStorage.setItem('recentTypologies', JSON.stringify(recentTypologies.value));
}

</script>


<template>
    <form @submit.prevent="searchTypologies" v-click-outside="removeActive" class="search-box" novalidate>

        <!-- Icon -->
        <button class="search-box-icon">
            <i class="fas fa-search fa-fw"></i>
        </button>

        <!-- Search Input -->
        <input v-model.trim="searchTerm" type="text" id="search-typology" class="form-control search-box-input"
            placeholder="Specializzazione" autocomplete="off" @input="searchThrottle" @focusin="isActive = true">

        <!-- Reset Button -->
        <button v-if="searchTerm" type="button" class="search-box-reset" @click="searchReset">
            <i class="fas fa-close fa-fw"></i>
        </button>

        <!-- Suggests -->
        <div v-if="isActive" class="search-box-suggests">

            <!-- Loader -->
            <div v-if="isLoading" class="text-center p-2"><i class="fas fa-spinner fa-spin-pulse fa-lg"></i></div>

            <!-- Recents -->
            <ul v-else-if="!searchTerm">
                <li>
                    <h6 class="mb-0">Recenti</h6>
                </li>
                <li v-for="typology in recentTypologies" :key="typology.id" @click="setTypology(typology)">
                    <i class="far fa-clock fa-fw"></i>
                    <span>{{ typology.name }}</span>
                </li>
            </ul>

            <!-- Fetched -->
            <div v-else>
                <ul v-if="typologies.length" class="suggests-fetched">
                    <li v-for="typology in typologies" :key="typology.id" @click="setTypology(typology)">
                        <i class="fa-fw" :class="typology.icon"></i>
                        <span>{{ typology.name }}</span>
                    </li>
                </ul>

                <!-- No results -->
                <div v-else class="text-danger fw-bold p-2">Nessun risultato.</div>
            </div>

        </div>
    </form>
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