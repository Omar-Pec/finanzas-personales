<script setup>
import { ref } from 'vue';
import { getDatabase, ref as dbRef, push } from "firebase/database";
import { auth } from '../firebase.js';

const type = ref('ingresos')
const amount = ref(0)
const db = getDatabase();

console.log(auth.currentUser.uid);


const addTransaction = async() =>{
    const user = auth.currentUser
    if (user && amount.value != null) {
        const transactionsRef = dbRef(db, `transactions/${user.uid}`)

    const newTransaction = {
        type: type.value,
        amount: amount.value,
        date: new Date().toISOString().slice(0, 10), 
        userId: user.uid
    }

    await push(transactionsRef, newTransaction)
    alert("Transacción añadida")
    amount.value = null
    }
}
</script>

<template>
    <div class="d-flex justify-content-center align-items-center">
        <div class="contenedor text-dark rounded-4 py-4">
        <h1 class="title" >Añadir transacción</h1>
    <form @submit.prevent="addTransaction">
    <div>
        <label style="margin-right: 5px;">Tipo de transacción</label>
        <select v-model="type" id="">
            <option value="ingresos">Ingresos</option>
            <option value="gastos">Gastos</option>
        </select>
    </div>

    <div>
        <label style="margin-right: 5px;">Cantidad</label>
        <input v-model="amount" type="number" required>
    </div>
    <button type="submit">Agregar transacción</button>
    </form>
    </div>
    </div>
  
    
</template>

<style scoped>
.contenedor{
  width: 50%;
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