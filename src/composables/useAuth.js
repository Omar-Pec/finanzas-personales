import { ref, onMounted, watch } from "vue";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import router from "@/router";

const user = ref(null)
const auth = getAuth()
const InvalidLogin = ref()
const InvalidRegister = ref()

const googleAuthProvider = new GoogleAuthProvider()

export function useAuth(){
    onMounted(() =>{
        onAuthStateChanged(auth, (firebaseUser) =>{
            user.value = firebaseUser
        })
    })

    const login = async(email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            InvalidLogin.value = false;
        } catch (error) {
            console.error("Error al iniciar sesión: ", error)
            InvalidLogin.value = true;
        }
        router.push('/')
    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider)
            if (result) {
                router.push('/')
            }
        } catch (error) {
            console.error("Error de autenticación con google: ", error);
            
        }
    }

    const register = async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth , email, password)
                await updateProfile(userCredential.user, {
                    displayName: username
                })
                InvalidRegister.value = false;
        } catch (error) {
            console.error("Hubo un error al crear la cuenta", error);
            InvalidRegister.value = true;
        }
        router.push('/')
    }

    const logout = async () => {
        try {
            await signOut(auth)
            user.value = null
            router.push('/auth')
        } catch (error) {
            console.error("Error al cerrar sesión: ", error)
        }
    }
    return{
        user,
        InvalidLogin,
        InvalidRegister,
        login,
        logout,
        register,
        signInWithGoogle
    }
}

