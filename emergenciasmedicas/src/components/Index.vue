<template>
  <div>    
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ tituloCustomizado }}</a>
      </div>
    </nav>

    <div class="container">

      <div class="row mt-5">
        <div class="col-6 p">
          <profissionais />
        </div>

        <div class="col-6">
          <equipamentos />
        </div>
      </div>

      <div class="row mt-5 mb-5 bg-light p-2">
        <div class="col">
          <configuracao-equipe />
        </div>
      </div>

      <div class="row mt-5 mb-5">
        <div class="col">
          <equipes />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import ConfiguracaoEquipe from './ConfiguracaoEquipe.vue'
import Equipamentos from './Equipamentos.vue'
import Equipes from './Equipes.vue'
import Profissionais from './Profissionais.vue'

export default {
  components: { 
    ConfiguracaoEquipe,
    Equipamentos,
    Equipes,
    Profissionais
  },
  name: 'Index',
  props: {
    msg: String
  },
  computed: {
    tituloCustomizado() {
      return `.: ${this.$store.state.titulo}`
    }
  },
  methods: {
  ...mapMutations([
    'setSocorristas', 
    'setMedicos',
    'setCarros',
    'setTelefones',
    'setkitsDeReanimacao'
  ]),
  // ...mapActions(['fetchEquipamentos','fetchProfissionais']) --*** metodo em array
/*
  ...mapActions({ --*** metodo como objeto
    x: 'fetchEquipamentos',
    y: 'fetchProfissionais'
  })
*/
...mapActions({
  fetchEquipamentos: (dispatch, payload) => {
    //implementar lógica
    dispatch('fetchEquipamentos', payload)
    //implementar lógica
  },
  fetchProfissionais: dispatch => {
    //implementar lógica
    dispatch('fetchProfissionais')
  }
  })
  },
  created() {
/*
    this.$store.dispatch({          *** metodo sem mapActions
      type: 'fetchEquipamentos',
      carros: true,
      telefones: true,
      kitDeReanimacao: true
    })

    this.$store.dispatch('fetchProfissionais')
*/   

this.fetchEquipamentos({
      carros: true,
      telefones: true,
      kitDeReanimacao: true
})
this.fetchProfissionais()

/*      nesse metodo aqui, sem utilizar o action *** todos estão lá no store

    fetch('http://localhost:3001/enfermeiros')
      .then(response => response.json())
      .then(dados => this.$store.commit('setEnfermeiros', dados))

    fetch('http://localhost:3001/socorristas')
      .then(response => response.json())
      .then(dados => this.setSocorristas(dados))
      
    fetch('http://localhost:3001/medicos')
      .then(response => response.json())
      .then(dados => this.setMedicos(dados))
      
    fetch('http://localhost:3001/equipamentos')
      .then(response => response.json())
      .then(dados => { 
        this.setCarros(dados.carros)
        this.setTelefones(dados)
        this.setkitsDeReanimacao(dados.kitsDeReanimacao)
      })
*/

  }
}
</script>
