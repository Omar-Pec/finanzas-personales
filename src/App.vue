<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(false)
const router = useRouter()

onAuthStateChanged(auth, (user) =>{
  isAuthenticated.value = !!user
})

const logout  = async() =>{
 await signOut(auth)
 isAuthenticated.value = false
 router.push('/auth')
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav v-if="isAuthenticated">
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/transactions">Transaction</RouterLink>
        <button @click="logout">Logout</button>
      </nav>
    </div>
  </header>
  <main>

  <RouterView />
  </main>
</template>

<style scoped>
nav{
  text-align: center;
  display: flex;
  gap: 2rem;
  justify-content: center;
  font-size: 1.2 rem;
}
main{
  text-align: center;
  margin-top: 3rem;
}
</style>
