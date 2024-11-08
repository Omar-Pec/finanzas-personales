<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from "../composables/useAuth.js";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { auth } from '@/firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import BarChart from "../components/BarChart.vue";

const { user } = useAuth();
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Gastos",
      backgroundColor: "rgb(255, 99, 132)",
      data: []
    },
    {
      label: "Ingresos",
      backgroundColor: "rgb(54, 162, 235)",
      data: []
    }
  ]
});

// Inicializar la base de datos
const db = getDatabase();

// Función para obtener los datos de las transacciones
const fetchData = (userUid) => {
  // Referencia a las transacciones del usuario registrado
  const transactionsRef = dbRef(db, `transactions/${userUid}`);
  onValue(transactionsRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return console.log("No hay datos");
    const labels = [];
    const ingresos = [];
    const gastos = [];
    for (const key in data) {
      const { type, amount, date } = data[key];
      labels.push(new Date(date).toLocaleDateString());
      if (type === 'ingresos') {
        ingresos.push(amount);
      } else if (type === 'gastos') {
        gastos.push(amount);
      }
    }
    chartData.value.labels = labels;
    chartData.value.datasets[0].data = gastos;
    chartData.value.datasets[1].data = ingresos;
  });
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUid = auth.currentUser.uid;
      fetchData(userUid);
    } else {
      console.log("No hay un usuario autenticado");
    }
  });
});

</script>

<template>
    <div class="d-flex justify-content-center align-items-center">
      <div class="text-dark rounded-4 contenedor">
        <h2 v-if="user" class="mt-4 title">Bienvenido al dashboard {{ user.displayName }}</h2>
        <div v-if="chartData && chartData.labels.length > 0">
          <BarChart :chartData="chartData" class="mx-4 mb-3"/>
        </div>
        <div v-else>
          <h3>No hay datos ingresados para mostrar en el dashboard</h3>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
.contenedor{
  width: 90%;
  height: 85%;
  margin: 0 auto;
  background: #fff;
  box-shadow: 5px 5px #dedede;
  margin-bottom: 10px;
}
.title{
  font-weight: 800;
  text-transform: uppercase;
  margin: 15px;
  font-size: 30px;
}
* {
  font-family: "Inter", sans-serif;
  letter-spacing: 1px;
}
  </style>
  