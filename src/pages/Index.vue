<template>
  <q-page padding>

    <div class="row justify-center">
      <div class="col-xs-12 col-sm-8 col-md-8 col-lg-5">
        <q-card>
          <q-card-section class="nova-tarefa-card">
            <q-input borderless
              class="nova-tarefa-input"
              v-model="novaTarefa"
              placeholder="Criar uma tarefa..."
              input-class="text-weight-medium text-subtitle1 text-grey-8"
              @keyup.enter="adicionarTarefaNaLista()" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-sm-3 col-xl-2">
        <q-card>
          <q-list class="espacado-em-cima">

            <q-item clickable v-ripple
              v-for="tarefa in tarefas"
              @click="alternarFinalizacaoDaTarefa(tarefa)">

              <q-item-section avatar>
                <q-checkbox size="xs" color="grey-8" v-model="tarefa.finalizada" />
              </q-item-section>

              <q-item-section
                :class="{ 'tarefa-finalizada': tarefa.finalizada }">

                {{ tarefa.descricao }}
              </q-item-section>
            </q-item>

          </q-list>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<style scoped>
  .espacado-em-cima {
    margin-top: 30px;
  }

  .tarefa-finalizada {
    text-decoration: line-through;
  }

  .nova-tarefa-card {
    padding: 0px 20px;
  }

  .nova-tarefa-input {
    height: 46px;
  }
</style>

<script>
export default {
  name: 'PageIndex',
  created() {
    this.pegarTarefasCadastradas();
  },
  data() {
    return {
      novaTarefa: '',
      tarefas: [],
    };
  },
  methods: {
    pegarTarefasCadastradas() {
      const headers = { 'Accept': 'application/json' };

      this.$axios.get('http://localhost:3000/tarefas', { headers: headers })
        .then((response) => {
          this.tarefas = response.data;
        });
    },
    adicionarTarefaNaLista() {
      const headers = { 'Accept': 'application/json' };
      const data = { tarefa: { descricao: this.novaTarefa, finalizada: false } }

      if (this.novaTarefa === '') {
        return;
      }

      this.$axios.post('http://localhost:3000/tarefas', data, { headers: headers })
        .then(() => {
          this.pegarTarefasCadastradas();
        });

      this.novaTarefa = '';
    },
    alternarFinalizacaoDaTarefa(tarefa) {
      const headers = { 'Accept': 'application/json' };
      const data = { tarefa: { finalizada: !tarefa.finalizada } }

      this.$axios.put(
        `http://localhost:3000/tarefas/${tarefa.id}`,
        data,
        { headers: headers }
      )
        .then(() => {
          this.pegarTarefasCadastradas();
        });
    },
  },
};
</script>
