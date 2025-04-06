import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export function useAuth() {
  const isAuthenticated = ref(false)
  const router = useRouter()

  const checkAuth = () => {
    const auth = localStorage.getItem('isAdminAuthenticated')
    isAuthenticated.value = auth === 'true'
    return isAuthenticated.value
  }

  const logout = () => {
    localStorage.removeItem('isAdminAuthenticated')
    isAuthenticated.value = false
    router.push('/admin/login')
  }

  onMounted(() => {
    checkAuth()
  })

  return {
    isAuthenticated,
    checkAuth,
    logout
  }
} 