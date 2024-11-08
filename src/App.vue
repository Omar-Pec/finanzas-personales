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
    <nav class="navbar navbar-expand-lg rounded-5 rounded-top-0 bg-light stroke" v-if="isAuthenticated">
  <div class="container-fluid px-5 mx-5 ">
    
    <span class="navbar-brand m-0 p-0 finance">
      Finanzas personales
    </span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="justify-content-end collapse navbar-collapse " id="navbarNav">
      <ul class="navbar-nav text-center">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link active">Dashboard</RouterLink>
        </li>
        <li class="nav-item text-center">
          <RouterLink to="/transactions" class="nav-link active">Transacciones</RouterLink>
        </li>
        <li @click="logout" class="nav-item d-flex justify-content-center" style="cursor: pointer;">
          <a class="nav-link active">

            
          Logout
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg>

          </a>
              
              
        </li>
      </ul>
    </div>
  </div>
</nav>
  </header>
  <main>
  <RouterView />
  </main>
</template>

<style scoped>
main{
  text-align: center;
  margin-top: 20px;
}
.boton{
  background-color: #0697f0;
}
* {
  font-family: "Inter", sans-serif;
  letter-spacing: 0px;
}

/* NAVIGATION */
nav {
  margin: 0 auto;
  background: #fff;
  box-shadow: 0px 5px 0px #dedede;
}
nav ul {
  list-style: none;
  text-align: center;
}
nav ul li {
  display: inline-block;
}
nav ul li a, .finance{
  display: block;
  padding-bottom: 5px;
  text-decoration: none;
  font-weight: 800;
  text-transform: uppercase;
  margin: 5px 15px;
}
nav ul li a,
nav ul li a:after,
nav ul li a:before {
  transition: all .5s;
}
nav ul li a:hover {
  color: #555;
}

/* stroke */
nav.stroke ul li a,
nav.fill ul li a {
  position: relative;
}
nav.stroke ul li a:after,
nav.fill ul li a:after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 0%;
  content: '.';
  color: transparent;
  background: #aaa;
  height: 1px;
}
nav.stroke ul li a:hover:after {
  width: 100%;
}

nav.fill ul li a {
  transition: all 2s;
}

nav.fill ul li a:after {
  text-align: left;
  content: '.';
  margin: 0;
  opacity: 0;
}
nav.fill ul li a:hover {
  color: #fff;
  z-index: 1;
}
nav.fill ul li a:hover:after {
  z-index: -10;
  animation: fill 1s forwards;
  -webkit-animation: fill 1s forwards;
  -moz-animation: fill 1s forwards;
  opacity: 1;
}
</style>
