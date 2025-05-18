<template>
  <div class="legal-page">
    <h1>Términos de Servicio</h1>
    <p>Al usar este sitio aceptas las siguientes normas:</p>
    <ol>
      <li>Uso solo para fines lícitos.</li>
      <li>Queda prohibida la reproducción sin permiso.</li>
      <li>Reservamos el derecho a modificar estos términos.</li>
    </ol>
    <h2>Protección de datos</h2>
    <p>
      Los datos que facilites se tratarán conforme a nuestra 
      <router-link to="/politica-privacidad" class="link">Política de Privacidad</router-link>.
    </p>
    <h2>Publicidad en Meta</h2>
    <p>Todos nuestros anuncios cumplen con los Advertising Standards de Meta y con el GDPR europeo.</p>
  </div>
</template>

<script>
export default {
  name: 'TerminosServicio'
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

.legal-page p,
.legal-page ol {
  margin: 0.8rem 0;
}

.legal-page ol {
  padding-left: 1.5rem;
}

.link {
  color: #1a73e8;
  text-decoration: underline;
  cursor: pointer;
}

.link:hover {
  color: #1558b0;
}
</style>
