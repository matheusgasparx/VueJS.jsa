<template>
  <div>
      <nav class="navbar navbar-light bg-light menu-superior">
          <div class="container">
              <a class="navbar-brand" href="#">Empresa 360</a>
              <div class="navbar-nav">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                          <router-link class="nav-link" to="/">Voltar</router-link>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>

      <div class="row mt-5">
          <div class="col-6 offset-3">
              <div class="card">
                  <p class="card-header">Entrar</p>
                  <div class="card-body">
                      <div class="mb-3">
                          <input type="email" class="form-control" placeholder="E-mail">
                      </div>
                      <div class="mb-3">
                          <input type="password" class="form-control" placeholder="Senha">
                      </div>
                      <button class="btn btn-primary" @click="navegarPara">Login</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
  
<script>
export default {
    name: 'Login',
    methods: {
      navegarPara(){
        // coletar os dados
        // realizar uma req http de aut
        // receber o token de autoriazao

        this.$router.push('/home')
        // this.$router.push({ path: '/home'})
        
        // this.$router.replace('/home')
        // this.$router.replace({ path: '/home'})

        // this.$router.forward() *** avança no historico do navegador
        // this.$router.back() *** retorna no historico do navegador

        // this.$router.go(2) *** avança a quantidade x do navegador
        // this.$router.go(-2) ** retorna a quantidade x do nevagador
      }
    }
};
</script>
  
<style></style>