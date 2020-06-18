<template>
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
</template>

<style scoped>
  .nova-tarefa-card {
    padding: 0px 20px;
  }

  .nova-tarefa-input {
    height: 46px;
  }
</style>

<script>
import api from '../../services/api';

export default {
  props:{
    quandoTarefaForSalva: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      novaTarefa: '',
    };
  },
  methods: {
    adicionarTarefaNaLista() {
      const data = { tarefa: { descricao: this.novaTarefa, finalizada: false } };

      if (this.novaTarefa === '') {
        return;
      }

      api.post('/tarefas', data)
        .then(this.quandoTarefaForSalva);

      this.novaTarefa = '';
    },
  },
};
</script>
