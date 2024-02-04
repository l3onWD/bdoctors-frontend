<script setup>
import { computed } from 'vue';

//*** PROPS ***//
const props = defineProps({
    doctor: {
        type: Object,
        required: true
    }
});

//*** PHOTO ***//
const photoUrl = computed(() => props.doctor.profile.photo || 'img/profile-placeholder.png');

</script>


<template>
    <div class="doctor-card h-100">
        <!-- Card Top -->
        <div class="d-flex gap-3 mb-2">
            <img :src="photoUrl" alt="Profile Picture" class="doctor-card-photo">
            <div>
                <h5>{{ doctor.first_name + ' ' + doctor.last_name }}</h5>
                <p><i class="fas fa-location-dot"></i> {{ doctor.profile.address }}</p>
            </div>
        </div>

        <!-- Card Body -->
        <div>
            <strong>Specializzazioni:</strong>
            <ul class="row row-cols-2 mb-3">
                <li v-for="typology in doctor.profile.typologies" :key="typology.id" class="col">{{ typology.name }}</li>
            </ul>

            <hr>

            <strong>Servizi:</strong>
            <p>{{ doctor.profile.services }}</p>

            <hr>

            <strong>Bio:</strong>
            <p>{{ doctor.profile.description }}</p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;

.doctor-card {
    padding: 1rem;

    border: 1px solid $col-gray-500;
    border-radius: 1rem;
    box-shadow: 0 0 8px rgba($color: $col-dark, $alpha: 0.2);

    &-photo {
        width: 50px;
        height: 50px;

        border-radius: 50%;
        box-shadow: 0 0 8px rgba($color: #000, $alpha: 0.3);
        object-fit: cover;
    }
}
</style>