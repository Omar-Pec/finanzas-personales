<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
    chartData: Object
})


</script>

<template>
     <div v-if="chartData && chartData.labels.length > 0" >
    <Bar :data="chartData" />
    </div>
</template>

<style scoped>
</style>
