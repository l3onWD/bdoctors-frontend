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
            <header>
                <h2>Dottori in evidenza</h2>
            </header>

            <!-- Doctors -->
            <ul v-if="doctors.length" class="row row-cols-2">
                <li v-for="doctor in doctors" :key="doctor.id" class="col">
                    <DoctorCard :doctor="doctor" />
                </li>
            </ul>
            <div v-else>Non ci sono risultati.</div>
        </div>

    </section>
</template>


<style scoped></style>