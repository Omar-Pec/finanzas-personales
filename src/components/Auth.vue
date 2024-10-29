<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useAuth } from "@/composables/useAuth.js";

    const isLogin = ref(true)
    const email = ref('')
    const password = ref('')
    const username = ref('')
    const router = useRouter()

    const {login, register, signInWithGoogle, InvalidLogin, InvalidRegister} = useAuth()

    const toggleAuth = () =>{
        isLogin.value = !isLogin.value
    }

    const handleSubmit = async () =>{
        try {
            if (isLogin.value) {
                await login(email.value, password.value)
            }else{
                await register(email.value, password.value, username.value)
            }
            router.push('/');
        } catch (error) {
            
        }
    }
</script>

<template>

<div class="d-flex justify-content-center">
    <div class="bg-light bg-gradient p-5 bg-opacity-75 rounded-3">
        <h1>{{ isLogin ? "Iniciar sesión" : "Registro" }}</h1>
        <form @submit.prevent="handleSubmit" class="px-5 py-4 d-flex flex-column " >
        <div class="inputs">
            <div v-if="!isLogin" class="input-group mb-3">
                <input id="username" v-model="username" type="text" class="form-control" placeholder="Nombre de usuario" required>
            </div>

            <div class="input-group mb-3">
                <input id="email" v-model="email" type="email" class="form-control" placeholder="Email" required>
            </div>

            <div class="input-group mb-3">
                <input id="password" v-model="password" type="password" class="form-control" placeholder="Contraseña" required>
            </div>

            <p v-if="InvalidLogin" class="m-0 error">correo o contraseña incorrecta</p>
            
            <p v-if="InvalidRegister" class="m-0 error">ingrese los datos correctamente</p>
        </div>
        <button type="submit" class="btn btn-primary mb-4 button-login-register">{{ isLogin ? "Iniciar sesión" : "Registrarse" }}</button>

        <div @click="signInWithGoogle" class="btn pe-3 d-flex align-items-center button-google">
                <img src="../imgs/google-icon.png" alt="google-icon" width="30px" class="me-3 img-fluid">
                Iniciar sesión con Google
        </div>

        </form>
        <p @click="toggleAuth" style="cursor: pointer;">{{ isLogin ? "¿No tienes una cuenta? Registrate" : "¿Ya tienes cuenta? Iniciar sesión"}}</p>
    </div>
</div>
</template>

<style scoped>
*{
    margin: 0px;
    padding: 0px;
    color: black;
}
.inputs {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-bottom: 20px;
}
input{
    padding: 0.6rem;
}
label{
    display: block;
    text-align: left;
}
.button-google{
    background-color: #4267b2;
    padding: 6px;
    color: white;
}
.button-google:hover{
    background-color: #4267b2e9;
}
.button-login-register{
    padding: 6px;
    background-color: #0171d3;
    color: white;
}
.button-login-register:hover{
    background-color: #0171d3e4;
}
.error{
    color: red;
}
</style>