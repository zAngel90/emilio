<template>
  <div class="legal-page">
    <!-- Banner de cookies -->
    <CookieBanner />

    <h1>Política de Privacidad</h1>
    <section>
      <h2>Consentimiento de Cookies</h2>
      <p>Mostramos un banner de cookies en la primera visita. No cargamos el Píxel de Meta ni otras cookies de marketing antes de que el usuario acepte.</p>
      <p>El consentimiento es explícito, informado y puede retirarse en cualquier momento.</p>
    </section>

    <section id="facebook-meta">
      <h2>Uso de Facebook/Meta</h2>

      <h3>Píxel de Meta</h3>
      <p>
        El Píxel de Meta recopila información de navegación para medir conversiones y optimizar anuncios.  
        Sólo se activa tras consentimiento expreso y los datos se transfieren a servidores de Meta en EE.UU. bajo cláusulas contractuales estándar.  
      </p>

      <h3>Custom Audiences</h3>
      <p>
        Utilizamos Custom Audiences para crear audiencias basadas en clientes existentes.  
        Subimos hashes de emails o números de teléfono de forma segura y anónima, y Meta los combina con sus usuarios para mostrar anuncios.  
      </p>

      <h3>Lead Ads</h3>
      <p>
        Si captas leads mediante formularios de Meta (Lead Ads), detallamos en este sitio para qué usamos los datos recibidos:  
        - Contacto comercial (teléfono/email)  
        - Envío de ofertas y novedades  
      </p>
      <p>
        Para ejecutar Lead Ads es obligatorio incluir un enlace a esta Política de Privacidad en el formulario.  
      </p>
    </section>

    <section id="tus-derechos">
      <h2>Tus derechos</h2>
      <ul>
        <li>Acceso, rectificación, supresión y oposición.</li>
        <li>Portabilidad de datos.</li>
        <li>Retirar el consentimiento en cualquier momento.</li>
      </ul>
    </section>
  </div>
</template>

<script>
import CookieBanner from '../components/CookieBanner.vue'
export default {
  name: 'PoliticaPrivacidad',
  components: { CookieBanner }
}
</script>

<style scoped>
.legal-page {
  background-color: #ffffff;
  color: #000000;
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem;
  line-height: 1.6;
  font-family: Arial, sans-serif;
  min-height: 100vh;
}

.legal-page h1 {
  margin-bottom: 1.5rem;
}

.legal-page h2 {
  margin-top: 2rem;
  color: #222;
}

.legal-page h3 {
  margin-top: 1.5rem;
  color: #444;
}

.legal-page p {
  margin: 0.8rem 0;
}

.legal-page ul {
  margin-left: 1.2rem;
  list-style-type: disc;
}

.legal-page ul li {
  margin: 0.5rem 0;
}
</style>
