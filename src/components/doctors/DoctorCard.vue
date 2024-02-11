<script setup>
import { computed } from 'vue';

//*** PROPS ***//
const props = defineProps({
    doctor: {
        type: Object,
        required: true
    }
});

//*** COMPUTED ***//
const doctorFullname = computed(() => `${props.doctor.user.first_name} ${props.doctor.user.last_name}`);
const photoUrl = computed(() => props.doctor.photo || 'img/profile-placeholder.png');

</script>


<template>
    <div class="doctor-card h-100">
        <!-- Card Top -->
        <div class="d-flex gap-3 mb-2">
            <img :src="photoUrl" alt="Profile Picture" class="doctor-card-photo">
            <div>
                <h5>{{ doctorFullname }}</h5>
                <p><i class="fas fa-location-dot"></i> {{ doctor.address }}</p>
            </div>
        </div>

        <!-- Card Body -->
        <div>

            <!-- Avg Vote -->
            <div class="d-flex align-items-center mb-2">
                <i v-for="n in 5" :key="n" class="fa-star text-warning"
                    :class="n <= doctor.stars_avg_vote ? 'fas' : 'far'"></i>
                <span class="ms-1">({{ doctor.stars_count }})</span>
            </div>

            <!-- Reviews Count -->
            <p class="mb-2"><i class="fas fa-comment"></i><span class="ms-1">{{ doctor.reviews_count }}</span></p>

            <!-- Typologies -->
            <strong>Specializzazioni:</strong>
            <ul class="d-flex flex-wrap gap-2 mt-2 mb-3">
                <li v-for="typology in doctor.typologies" :key="typology.id" :title="typology.name">
                    <i class="fa-lg" :class="typology.icon"></i>
                </li>
            </ul>

            <hr>

            <!-- Services -->
            <strong>Servizi:</strong>
            <p>{{ doctor.services }}</p>

            <hr>

            <!-- Description -->
            <strong>Bio:</strong>
            <p>{{ doctor.description }}</p>
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