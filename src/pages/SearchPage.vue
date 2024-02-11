<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiClient } from '@/http';


//*** COMPONENTS ***//
import AppLoader from '@/components/AppLoader.vue';
import DoctorCard from '@/components/doctors/DoctorCard.vue';


//*** FILTERS APPLY ***//
const router = useRouter();
const route = useRoute();
const filters = ref({
    minVote: route.query.min_vote || '',
    minReviews: route.query.min_reviews || '',
});

const filter = () => {

    const query = {
        typologyName: route.query.typologyName,
        'typologies[]': route.query['typologies[]'],
        min_vote: filters.value.minVote,
        min_reviews: filters.value.minReviews,
    }

    router.push({ name: 'search', query });
}

const resetFilters = () => {

    filters.value.minVote = '';
    filters.value.minReviews = '';

    filter();
}


//*** FETCH RESULTS ***//
const doctors = ref([]);
const isLoading = ref(false);

const fetchDoctors = () => {

    const params = { ...route.query };
    isLoading.value = true;

    apiClient.get('/doctors/search', { params })
        .then(({ data }) => {
            doctors.value = data;
        })
        .catch(err => {
            console.error(err);
        })
        .then(() => {
            isLoading.value = false;
        });
}


//*** ON QUERY CHANGE ***//
const routeQuery = computed(() => route.query);

watch(routeQuery, () => {
    fetchDoctors();
}, { immediate: true });

</script>


<template>
    <section class="container-fluid">

        <div v-if="!isLoading">

            <!-- Section Title -->
            <header class="mb-4">
                <h3>Risultati per: {{ route.query.typologyName }}</h3>
            </header>


            <!-- Filters -->
            <form @submit.prevent="filter" class="row align-items-center mb-3" novalidate>

                <!-- Min Vote -->
                <div class="col-auto d-flex align-items-center gap-2 mb-3">
                    <label for="filter-vote" class="text-warning"><i class="fas fa-star"></i></label>
                    <select v-model="filters.minVote" id="filter-vote" class="form-select">
                        <option value=""> - </option>
                        <option value="1">&star;</option>
                        <option value="2">&star;&star;</option>
                        <option value="3">&star;&star;&star;</option>
                        <option value="4">&star;&star;&star;&star;</option>
                        <option value="5">&star;&star;&star;&star;&star;</option>
                    </select>
                </div>

                <!-- Min Reviews -->
                <div class="col-auto d-flex align-items-center gap-2 mb-3">
                    <label for="filter-reviews"><i class="fas fa-comment"></i></label>
                    <input v-model="filters.minReviews" type="number" id="filter-reviews" class="form-control" min="0"
                        max="999">
                </div>

                <!-- Actions -->
                <div class="col-auto mb-3">
                    <button @click="resetFilters" type="button" class="btn btn-outline-secondary me-1"><i
                            class="fas fa-close"></i></button>
                    <button class="btn btn-success"><i class="fas fa-rotate"></i></button>
                </div>
            </form>


            <!-- Results -->
            <ul v-if="doctors.length" class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                <li v-for="doctor in doctors" :key="doctor.id" class="col mb-3">
                    <DoctorCard :doctor="doctor" :selectedTypology="Number(route.query['typologies[]'])" />
                </li>
            </ul>
            <div v-else>Non ci sono risultati.</div>
        </div>


        <!-- Loader -->
        <AppLoader v-if="isLoading" />

    </section>
</template>


<style scoped></style>