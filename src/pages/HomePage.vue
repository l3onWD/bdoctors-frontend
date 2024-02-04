<script setup>
import { ref } from 'vue';
import { apiClient } from '@/http';


//*** COMPONENTS ***//
import DoctorCard from '@/components/doctors/DoctorCard.vue';


//*** DOCTORS ***//
const doctors = ref([]);
const isLoading = ref(false);

const fetchDoctors = () => {
    isLoading.value = true;

    apiClient.get('/doctors')
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

fetchDoctors();

</script>


<template>
    <section class="container-fluid">

        <div v-if="!isLoading">

            <!-- Section Title -->
            <header class="mb-3">
                <h3>In evidenza</h3>
            </header>

            <!-- Doctors -->
            <ul v-if="doctors.length" class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                <li v-for="doctor in doctors" :key="doctor.id" class="col mb-3">
                    <DoctorCard :doctor="doctor" />
                </li>
            </ul>
            <div v-else>Non ci sono risultati.</div>
        </div>

    </section>
</template>


<style scoped></style>