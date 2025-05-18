import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Gallery from '../views/Gallery.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminPanel from '../views/AdminPanel.vue'

// Importa las nuevas páginas que creaste
import PoliticaPrivacidad from '../views/PoliticaPrivacidad.vue'
import AvisoLegal from '../views/AvisoLegal.vue'
import TerminosServicio from '../views/TerminosServicio.vue'
import Contacto from '../views/Contacto.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/galeria',
      name: 'Gallery',
      component: Gallery
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      component: AdminPanel,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true'
        if (!isAuthenticated) {
          next('/admin/login')
        } else {
          next()
        }
      }
    },
    // Aquí añades las nuevas rutas
    {
      path: '/politica-privacidad',
      name: 'PoliticaPrivacidad',
      component: PoliticaPrivacidad
    },
    {
      path: '/aviso-legal',
      name: 'AvisoLegal',
      component: AvisoLegal
    },
    {
      path: '/terminos-servicio',
      name: 'TerminosServicio',
      component: TerminosServicio
    },
    {
      path: '/contacto',
      name: 'Contacto',
      component: Contacto
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
