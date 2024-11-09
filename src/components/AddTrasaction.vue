<script setup>
import { ref } from 'vue';
import { getDatabase, ref as dbRef, push } from "firebase/database";
import { auth } from '../firebase.js';

const type = ref('ingresos')
const amount = ref(0)
const db = getDatabase();

console.log(auth.currentUser.uid);


const addTransaction = async () => {
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
            <h1 class="title">Añadir transacción</h1>
            <form @submit.prevent="addTransaction" class="d-inline-flex flex-column px-5 py-4 rounded-5">

                <label class="my-1 form-label fw-bold">Tipo de transacción</label>
                <select v-model="type" id="" class="my-1 form-select border-input-select">
                    <option value="ingresos">Ingresos</option>
                    <option value="gastos">Gastos</option>
                </select>

                <label class="mb-1 mt-4 fw-bold">Cantidad</label>
                <input v-model="amount" type="number" min="0" required class="my-1 form-control border-input-select">

                <button type="submit" class="mt-5 btn btn-outline-success">Agregar transacción</button>
            </form>
        </div>
    </div>


</template>

<style scoped>
.contenedor {
    width: 50%;
    background: #fff;
    box-shadow: 5px 5px #dedede;
}

.title {
    font-weight: 800;
    text-transform: uppercase;
    margin: 15px;
    font-size: 30px;
}

* {
    font-family: "Inter", sans-serif;
    letter-spacing: 1px;
}

.border-input-select,
form {
    border: 1.6px solid #86b7fe;
}
</style>