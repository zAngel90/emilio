<template>
  <div class="legal-page">
    <h1>Contacto</h1>
    <p>Si tienes dudas legales o sobre publicidad en Meta, escríbenos:</p>
    <ul>
      <li>📞 <a href="tel:665402571">665 402 571</a></li>
      <li>📧 <a href="mailto:emilioosado@hotmail.com">emilioosado@hotmail.com</a></li>
      <li>📍 Cádiz, España</li>
    </ul>
    <h2>Formulario de contacto</h2>
    <form action="#" @submit.prevent="submitForm">
      <input type="text" placeholder="Tu nombre" required />
      <input type="email" placeholder="Tu email" required />
      <textarea placeholder="Tu mensaje" required></textarea>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Contacto',
  methods: {
    submitForm() {
      alert('Formulario enviado – pronto te contactaremos.');
    }
  }
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
input,
textarea {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  color: #000;
  background-color: #fff;
}
button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #0052cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #003d99;
}
a {
  color: #0052cc;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
